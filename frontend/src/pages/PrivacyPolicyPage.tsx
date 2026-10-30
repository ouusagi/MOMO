
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const renderContent = (key: string) => {
    const content = t(key, { returnObjects: true }) as string[];

    return (
      <ul className="mt-3 space-y-2">
        {content.map((item, index) => (
          <li
            key={index}
            className="text-sm leading-7 text-[#5A2D2A] whitespace-pre-line"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const sections = [
    "operator",
    "collection",
    "retention",
    "thirdParty",
    "outsourcing",
    "destruction",
    "security",
    "ocr",
    "analytics",
    "rights",
    "contact",
    "changes",
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] px-5 py-10">
        <button onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-[#5A2D2A]"
        >← 
        </button>
      <main className="mx-auto max-w-3xl">
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-[#3D2C2C]">
            {t("privacyPolicy.title")}
          </h1>

          <p className="mt-3 text-sm text-[#B89090]">
            {t("privacyPolicy.effectiveDate")}
          </p>

          <p className="mt-6 text-sm leading-7 text-[#5A2D2A]">
            {t("privacyPolicy.introduction")}
          </p>
        </header>

        <div className="space-y-9">
          {sections.map((section) => {
            const baseKey = `privacyPolicy.sections.${section}`;
            const title = t(`${baseKey}.title`);

            return (
              <section key={section}>
                <h2 className="text-base font-bold text-[#3D2C2C]">
                  {title}
                </h2>

                {section === "collection" && (
                  <>
                    <p className="mt-3 text-sm leading-7 text-[#5A2D2A]">
                      {t(`${baseKey}.description`)}
                    </p>

                    <div className="mt-4 space-y-4">
                      {(
                        t(`${baseKey}.items`, {
                          returnObjects: true,
                        }) as {
                          category: string;
                          data: string;
                          purpose: string;
                        }[]
                      ).map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-[#FFD9CE] bg-white p-4"
                        >
                          <h3 className="font-semibold text-[#F47560]">
                            {item.category}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#5A2D2A]">
                            <span className="font-medium">
                              {t("privacyPolicy.labels.data")}
                            </span>{" "}
                            {item.data}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-[#5A2D2A]">
                            <span className="font-medium">
                              {t("privacyPolicy.labels.purpose")}
                            </span>{" "}
                            {item.purpose}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {section !== "collection" &&
                  renderContent(`${baseKey}.content`)}
              </section>
            );
          })}
        </div>

        <footer className="mt-12 border-t border-[#FFD9CE] pt-6">
          <p className="text-center text-xs text-[#B89090]">
            MOMO
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
