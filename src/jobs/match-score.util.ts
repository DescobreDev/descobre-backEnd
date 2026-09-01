import {
  AffirmativeType,
  ContractType,
  ExperienceLevel,
  ProfileType,
  WorkFormat,
} from '@prisma/client';

const EXPERIENCE_ORDER: ExperienceLevel[] = [
  'ESTAGIO',
  'JUNIOR',
  'PLENO',
  'SENIOR',
  'ESPECIALISTA',
];

const WEIGHTS = {
  disc: 0.35,
  cargo: 0.2,
  salario: 0.15,
  regime: 0.15,
  localizacao: 0.1,
  experiencia: 0.05,
} as const;

type CriterioKey = keyof typeof WEIGHTS;

export interface MatchInput {
  job: {
    positionId: number;
    sectorId: number;
    workFormat: WorkFormat;
    contractType: ContractType;
    salary: number | null;
    city: string | null;
    state: string | null;
    affirmative: AffirmativeType;
  };
  jobProfile: {
    primaryProfile: ProfileType;
    secondaryProfile: ProfileType | null;
    experienceLevel: ExperienceLevel;
  } | null;
  candidate: {
    profileType: ProfileType | null;
    profileTypeSecondary: ProfileType | null;
    desiredPositionId: number | null;
    desiredSectorId: number | null;
    desiredSalaryMin: number | null;
    desiredSalaryMax: number | null;
    contractTypes: ContractType[];
    city: string | null;
    state: string | null;
    acceptsTravel: boolean | null;
    experienceLevel: ExperienceLevel | null;
    affirmativeTypes: AffirmativeType[];
  };
}

export interface MatchBreakdownItem {
  label: string;
  weight: number; // peso original do critério (0-1)
  score: number | null; // 0-1, null = sem dado suficiente (não entrou no cálculo)
  contribution: number; // pontos (0-100) que esse critério deu no score final
}

export interface MatchResult {
  eligible: boolean;
  reasonIneligible?: string;
  finalScore: number; // 0-100
  breakdown: Record<CriterioKey, MatchBreakdownItem>;
}

function calcDisc(
  jobPrimary?: ProfileType | null,
  jobSecondary?: ProfileType | null,
  candPrimary?: ProfileType | null,
  candSecondary?: ProfileType | null,
): number | null {
  if (!jobPrimary || !candPrimary) return null;
  let score = 0;
  if (jobPrimary === candPrimary) score += 0.8;
  if (jobPrimary === candSecondary) score += 0.5;
  if (jobSecondary && jobSecondary === candPrimary) score += 0.3;
  if (jobSecondary && jobSecondary === candSecondary) score += 0.2;
  return Math.min(score, 1);
}

function calcCargo(
  job: MatchInput['job'],
  candidate: MatchInput['candidate'],
): number | null {
  if (!candidate.desiredPositionId && !candidate.desiredSectorId) return null;
  if (
    candidate.desiredPositionId &&
    candidate.desiredPositionId === job.positionId
  )
    return 1;
  if (candidate.desiredSectorId && candidate.desiredSectorId === job.sectorId)
    return 0.6;
  // "categoria relacionada" exige árvore de profissões — não implementado ainda
  return 0;
}

function calcSalario(
  job: MatchInput['job'],
  candidate: MatchInput['candidate'],
): number | null {
  if (job.salary == null) return null;
  if (candidate.desiredSalaryMin == null && candidate.desiredSalaryMax == null)
    return null;

  const min = candidate.desiredSalaryMin ?? -Infinity;
  const max = candidate.desiredSalaryMax ?? Infinity;

  if (job.salary >= min && job.salary <= max) return 1;
  if (job.salary > max) return 1; // vaga paga acima do esperado, não penaliza

  const deficit = (min - job.salary) / min; // quanto a vaga fica abaixo do mínimo desejado
  if (deficit <= 0.1) return 0.7;
  if (deficit <= 0.25) return 0.4;
  return 0;
}

function calcRegime(
  job: MatchInput['job'],
  candidate: MatchInput['candidate'],
): number | null {
  if (!candidate.contractTypes || candidate.contractTypes.length === 0)
    return null;

  const matches = candidate.contractTypes.includes(job.contractType);
  if (matches && candidate.contractTypes.length === 1) return 1;
  if (matches && candidate.contractTypes.length > 1) return 0.7;
  if (candidate.contractTypes.length > 1) return 0.4; // aceita outros regimes = flexível
  return 0;
}

function calcLocalizacao(
  job: MatchInput['job'],
  candidate: MatchInput['candidate'],
): number | null {
  if (job.workFormat === 'REMOTE') return 1;
  if ((!job.city && !job.state) || (!candidate.city && !candidate.state))
    return null;

  const sameCity =
    !!job.city &&
    !!candidate.city &&
    job.city.toLowerCase() === candidate.city.toLowerCase();
  const sameState =
    !!job.state &&
    !!candidate.state &&
    job.state.toLowerCase() === candidate.state.toLowerCase();

  let base = sameCity ? 1 : sameState ? 0.6 : 0;
  // Aproximação: sem CEP/lat-long não dá pra medir km reais (30km/60km/100km do modelo original)
  if (base === 0 && candidate.acceptsTravel) base = 0.15;

  return base;
}

function calcExperiencia(
  jobLevel?: ExperienceLevel | null,
  candLevel?: ExperienceLevel | null,
): number | null {
  if (!jobLevel || !candLevel) return null;
  const jobIdx = EXPERIENCE_ORDER.indexOf(jobLevel);
  const candIdx = EXPERIENCE_ORDER.indexOf(candLevel);
  if (jobIdx === -1 || candIdx === -1) return null;
  const diff = Math.abs(jobIdx - candIdx);
  if (diff === 0) return 1;
  if (diff === 1) return 0.5;
  return 0;
}

export function calculateMatchScore({
  job,
  jobProfile,
  candidate,
}: MatchInput): MatchResult {
  const labels: Record<CriterioKey, string> = {
    disc: 'Perfil comportamental',
    cargo: 'Cargo / Profissão',
    salario: 'Salário',
    regime: 'Regime de contratação',
    localizacao: 'Localização',
    experiencia: 'Experiência',
  };

  // Hard filter: vaga afirmativa
  if (job.affirmative && job.affirmative !== 'NOT_INFORMED') {
    const declared = candidate.affirmativeTypes?.includes(job.affirmative);
    if (!declared) {
      const breakdown = Object.fromEntries(
        (Object.keys(WEIGHTS) as CriterioKey[]).map((key) => [
          key,
          {
            label: labels[key],
            weight: WEIGHTS[key],
            score: null,
            contribution: 0,
          },
        ]),
      ) as Record<CriterioKey, MatchBreakdownItem>;

      return {
        eligible: false,
        reasonIneligible:
          'Esta vaga é destinada a um grupo afirmativo que o candidato não se autodeclarou.',
        finalScore: 0,
        breakdown,
      };
    }
  }

  const raw: Record<CriterioKey, number | null> = {
    disc: calcDisc(
      jobProfile?.primaryProfile,
      jobProfile?.secondaryProfile,
      candidate.profileType,
      candidate.profileTypeSecondary,
    ),
    cargo: calcCargo(job, candidate),
    salario: calcSalario(job, candidate),
    regime: calcRegime(job, candidate),
    localizacao: calcLocalizacao(job, candidate),
    experiencia: calcExperiencia(
      jobProfile?.experienceLevel,
      candidate.experienceLevel,
    ),
  };

  // Redistribui o peso dos critérios sem dado entre os que têm dado
  const availableWeightSum = (Object.keys(raw) as CriterioKey[]).reduce(
    (sum, key) => (raw[key] !== null ? sum + WEIGHTS[key] : sum),
    0,
  );

  const breakdown = {} as Record<CriterioKey, MatchBreakdownItem>;
  let finalScore = 0;

  for (const key of Object.keys(raw) as CriterioKey[]) {
    const score = raw[key];
    const normalizedWeight =
      availableWeightSum > 0 ? WEIGHTS[key] / availableWeightSum : 0;
    const contribution = score !== null ? score * normalizedWeight * 100 : 0;
    finalScore += contribution;
    breakdown[key] = {
      label: labels[key],
      weight: WEIGHTS[key],
      score,
      contribution,
    };
  }

  return { eligible: true, finalScore: Math.round(finalScore), breakdown };
}
