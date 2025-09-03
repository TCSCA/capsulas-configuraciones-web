import { ConfigAppearance } from "@/components/appearance/config-appearance";
import { ConfigEmail } from "@/components/email/config-email";
import { ConfigTransactions } from "@/components/transactions/config-transactions";

const ConfigurationsPage = () => {
    return (
        <div className="flex flex-col p-4 gap-2">
            <span className="font-bold text-2xl"> Módulo de Configuraciones</span>
            <ConfigEmail></ConfigEmail>
            <ConfigTransactions></ConfigTransactions>
            <ConfigAppearance></ConfigAppearance>
        </div>
    );
}

export default ConfigurationsPage;
