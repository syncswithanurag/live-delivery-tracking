import { OrderStatus } from "../types/tracking";

const statusLabel: Record<OrderStatus, string> = {
  order_placed: "Order placed",
  preparing: "Restaurant is preparing your food",
  picked_up: "Delivery partner picked your order",
  on_the_way: "Delivery partner is on the way",
  delivered: "Order delivered"
};

type DeliveryInfoCardProps = {
  status: OrderStatus;
  isConnected: boolean;
};

export const DeliveryInfoCard = ({ status, isConnected }: DeliveryInfoCardProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-base font-semibold text-slate-900">Delivery Info</h3>
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
          isConnected ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
        }`}
      >
        {isConnected ? "Live" : "Offline"}
      </span>
    </div>
    <p className="mt-3 text-sm text-slate-600">{statusLabel[status]}</p>
  </div>
);
