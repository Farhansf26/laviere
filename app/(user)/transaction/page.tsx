import ClientComponent from "@/provider/ClientComponent";
import TransactionClient from "./TransactionClient";

interface TransactionPageProps {
  searchParams: {
    order_id: string;
    status_code: string;
    transaction_status: string;
  };
}

export default async function TransactionPage({
  searchParams,
}: TransactionPageProps) {
  const params = await searchParams;

  return (
    <div>
      <ClientComponent>
        <TransactionClient transactionStatus={params.transaction_status} />
      </ClientComponent>
    </div>
  );
}
