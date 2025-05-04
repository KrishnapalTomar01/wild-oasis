import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "../../services/apiSettings";

function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting edited successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return { isEditing, editSetting };
}

export default useEditSetting;
