import { OrderStatus } from "../types/tracking";

const orderSteps: Array<{ id: OrderStatus; label: string }> = [
  { id: "order_placed", label: "Order Placed" },
  { id: "preparing", label: "Preparing" },
  { id: "picked_up", label: "Picked Up" },
  { id: "on_the_way", label: "On The Way" },
  { id: "delivered", label: "Delivered" }
];

type OrderTimelineProps = {
  currentStatus: OrderStatus;
};

export const OrderTimeline = ({ currentStatus }: OrderTimelineProps) => {
  const activeIndex = orderSteps.findIndex((step) => step.id === currentStatus);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">Order Timeline</h3>
      <div className="mt-3 space-y-3">
        {orderSteps.map((step, index) => {
          const isDone = index <= activeIndex;
          return (
            <div className="flex items-center gap-3" key={step.id}>
              <span
                className={`h-3 w-3 rounded-full ${
                  isDone ? "bg-brand-500" : "bg-slate-300"
                }`}
              />
              <p className={`text-sm ${isDone ? "text-slate-900" : "text-slate-500"}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
