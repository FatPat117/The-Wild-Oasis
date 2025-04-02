import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
export function useUpdateSetting() {
        const queryCilent = useQueryClient();

        const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
                mutationFn: (newSetting) => updateSettingAPI(newSetting),
                onSuccess: () => {
                        toast.success("Setting successfully updated");
                        queryCilent.invalidateQueries({ queryKey: ["settings"] });
                },
                onError: (err) => toast.error(err.message),
        });

        return { updateSetting, isUpdating };
}
