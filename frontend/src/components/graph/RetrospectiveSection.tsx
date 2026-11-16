import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { consumptionTypeIcons } from "../../constants/consumption";
import PeachCharacter from "../../assets/RetrospectiveMOMO.png";
import { useGetExpenses } from "../../hooks/useExpense";
import type { ConsumptionType, ConsumptionEmotion } from "../../types/expense";
import FaceIcon from '../../assets/emotionIcons/FaceIcon.svg';
import FillIcon from '../../assets/emotionIcons/FillIcon.svg';
import HeartIcon from '../../assets/emotionIcons/HeartIcon.svg';

const typeColors = {
  mood: "#FFE0DA",
  reward: "#EEE3F4",
  impulse: "#FFE7DA",
  necessary: "#E3F2EA",
};

const emotionColors = {
  happy: "#F47560",
  satisfied: "#FFAAA8",
  relaxed: "#FFD3A5",
  excited: "#FFE58F",
  stressed: "#CDA9DE",
  sad: "#BFC0C3",
};

const RetrospectiveSection = () => {
  const { t } = useTranslation();
  const { data: expensesData = [] } = useGetExpenses();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // 이번 달 날짜 필터링
  const monthlyExpenses = expensesData.filter((expense) => {
    const [expenseYear, expenseMonth] = expense.expenseDate
      .slice(0, 10)
      .split("-")
      .map(Number);

    return expenseYear === year && expenseMonth === month;
  });

  // 소비 유형이 기록된 지출만 필터링
  const typedExpenses = monthlyExpenses.filter(
    (expense) => expense.consumptionType,
  );

  // 소비 유형이 기록된 총 지출 금액
  const totalAmount = typedExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const types: ConsumptionType[] = ["mood", "reward", "impulse", "necessary"];

  // 각 소비 유형별 비율
  const typeData = types.map((type) => {
    const amount = typedExpenses
      .filter((expense) => expense.consumptionType === type)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      key: type,
      percent: totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0,
      color: typeColors[type],
    };
  });

  // 소비 감정이 기록된 지출
  const emotionalExpenses = monthlyExpenses.filter(
    (expense) => expense.consumptionEmotion,
  );

  // 소비 감정이 기록된 총 횟수
  const totalCount = emotionalExpenses.length;

  const emotions: ConsumptionEmotion[] = [
    "happy",
    "satisfied",
    "relaxed",
    "excited",
    "stressed",
    "sad",
  ];

  // 소비 감정별 비율
  const emotionData = emotions.map((emotion) => {
    const count = emotionalExpenses.filter(
      (expense) => expense.consumptionEmotion === emotion,
    ).length;

    return {
      key: emotion,
      percent: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
      color: emotionColors[emotion],
    };
  });

  // 가장 많은 지출이 발생한 소비 유형
  const topType =
    totalAmount > 0
      ? typeData.reduce((prev, current) =>
          current.percent > prev.percent ? current : prev,
        )
      : null;

  // 가장 많이 기록된 소비 감정
  const topEmotion =
    totalCount > 0
      ? emotionData.reduce((prev, current) =>
          current.percent > prev.percent ? current : prev,
        )
      : null;

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* 이번 달 소비 회고 */}
      <div className="relative overflow-hidden rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#FFD8D6] via-[#FFBEB7] to-[#FFE4DC] p-5 shadow-sm">
        <div className="relative z-10 flex items-center gap-3">
          <img src={PeachCharacter} className="w-32 shrink-0 object-contain" />

          <div className="flex-1">
            <p className="text-sm font-semibold text-[#80544E]">
              {t("retrospective.thisMonthYou")}
            </p>

            {topType ? (
              <>
                <h2 className="mt-3 text-lg font-extrabold leading-snug text-[#D95E50]">
                  {t(`enterDirectly.consumptionTypes.${topType.key}`)}
                  <br />
                  {t("retrospective.mostSpent")}
                </h2>

                <p className="mt-3 text-sm font-semibold text-[#80544E]">
                  {t("retrospective.typeDescription", {
                    type: t(`enterDirectly.consumptionTypes.${topType.key}`),
                    percent: topType.percent,
                  })}
                </p>
              </>
            ) : (
              <h2 className="mt-3 text-lg font-extrabold leading-snug text-[#3D2C2C]">
                {t("retrospective.noTypeData")}
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* 소비 유형별 분석 */}
      <div className="rounded-[30px] bg-white/70 p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold text-[#80544E]">
            <img src={FillIcon} width={23} height={23} />
            {t('retrospective.typeAnalysis')}
          </h3>
          <span className="text-xs text-[#B89090]">{t('retrospective.thisMonth')}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {typeData.map((item) => (
            <div
              key={item.key}
              className="flex flex-col items-center gap-2 rounded-2xl px-1 py-4"
              style={{ backgroundColor: item.color }}
            >
              <img
                src={consumptionTypeIcons[item.key]}
                alt={item.key}
                className="h-10 w-10 object-contain"
              />

              <span className="whitespace-nowrap text-[10px] font-semibold text-[#5A2D2A]">
                {t(`enterDirectly.consumptionTypes.${item.key}`)}
              </span>

              <strong className="text-lg text-[#D9685B]">
                {item.percent}%
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* 소비 감정 분석 */}
      <div className="rounded-[30px] bg-white/70 p-5 shadow-sm">
        <h3 className="mb-5 flex items-center gap-2 font-semibold text-[#80544E]">
          <img src={HeartIcon} width={23} height={23} />
          {t('retrospective.emotionAnalysis')}
        </h3>

        <div className="flex items-center gap-4">
          <div className="relative h-40 w-40 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="focus:outline-none">
                <Pie
                  data={emotionData}
                  dataKey="percent"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={1}
                  stroke="none"
                >
                  {emotionData.map((item) => (
                    <Cell key={item.key} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              {topEmotion ? (
                <>
                  <span className="text-sm font-semibold text-[#5A2D2A]">
                    {t(`enterDirectly.consumptionEmotions.${topEmotion.key}`)}
                  </span>
                  <strong className="text-xl text-[#D9685B]">
                    {topEmotion.percent}%
                  </strong>
                </>
              ) : (
                <span className="text-xs text-[#B89090]">
                  {t("retrospective.noData")}
                </span>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {emotionData.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#5A2D2A]">
                    {t(`enterDirectly.consumptionEmotions.${item.key}`)}
                  </span>
                </div>

                <strong className="text-[#3D2C2C]">{item.percent}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOMO의 한마디 */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-r from-[#FFE1DC] to-[#FFBDB7] p-5 shadow-sm">
        <div className="relative z-10 max-w-[72%]">
          <h3 className="mb-2 font-semibold text-[#80544E]">
            <div className="flex gap-3">
                <img src={FaceIcon} width={21} height={21} />
                {t("retrospective.momoMessageTitle")}
            </div>
          </h3>

          <p className="text-xs leading-relaxed text-[#5A2D2A]">
            {topType && topEmotion
              ? t("retrospective.momoMessage", {
                  type: t(`enterDirectly.consumptionTypes.${topType.key}`),
                  emotion: t(
                    `enterDirectly.consumptionEmotions.${topEmotion.key}`,
                  ),
                })
              : t("retrospective.momoEmptyMessage")}
          </p>
        </div>

        <img src={PeachCharacter} className="absolute -bottom-3 -right-2 w-28 object-contain -scale-x-100"/>
      </div>
    </div>
  );
};

export default RetrospectiveSection;
