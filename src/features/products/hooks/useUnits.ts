import { useQuery } from "@tanstack/react-query";
import { unitService } from "../../../services/unit-service.ts";

export function useUnits() {
  const { data: units } = useQuery({
    queryKey: ["units"],
    queryFn: unitService.getAll,
  });
  return { units };
}
