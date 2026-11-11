import type { Tamu } from "~/types/main.type";

export const UseTamu = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const tamuList: Ref<Tamu[]> = ref([]);
  const { getToken } = UseStorage();
  const token = getToken();
  const config = useRuntimeConfig();

  const apiUrl = config.public.apiBase;

  const fetchAllTamu = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch<Tamu[]>(`${apiUrl}/api/v1/guest-book/showAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      tamuList.value = res;
      console.log("tamuLiast:", res);
      return res;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal fetch tamu:", err);
    } finally {
      loading.value = false;
    }
  };

  const exportTamuToExcel = async () => {
    try {
      const res = await $fetch(`${apiUrl}/api/v1/guest-book/export`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([res], {
        type: "text/csv;charset=utf-8;",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "tamu.csv";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Gagal export tamu:", err);
    }
  };

  const approveTamu = async (id: number) => {
    try {
      await $fetch(`${apiUrl}/api/v1/guest-book/approve/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // update lokal
      const target = tamuList.value.find((t) => t.id === id);
      if (target) target.status = "approved";
    } catch (err) {
      console.error("Gagal approve tamu:", err);
    }
  };

  const rejectTamu = async (id: number, reason: string) => {
    try {
      await $fetch(`${apiUrl}/api/v1/guest-book/reject/${id}`, {
        method: "PUT",
        body: { rejection_reason: reason },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // update lokal
      tamuList.value = tamuList.value.filter((t) => t.id !== id);
    } catch (err) {
      console.error("Gagal reject tamu:", err);
    }
  };

  return {
    tamuList,
    loading,
    error,
    fetchAllTamu,
    approveTamu,
    rejectTamu,
    exportTamuToExcel,
  };
};
