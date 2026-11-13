<template>
  <div class="min-h-screen">
    <transition name="slide">
      <div
        v-if="showNotification"
        class="fixed top-4 right-4 z-50 shadow-lg rounded-lg p-4 border-l-4 border-green-500"
      >
        <div class="flex items-center gap-3">
          <svg
            class="text-green-500"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-gray-800 font-medium">{{ notificationMessage }}</p>
        </div>
      </div>
    </transition>

    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          Manajemen Undangan Tamu
        </h1>
        <p class="text-gray-600">
          Kelola dan setujui undangan masuk untuk kalender pendidikan
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-3">
          <div
            class="border border-secondary-red rounded-xl shadow-md p-6 mb-6"
          >
            <div class="flex items-center justify-between mb-6">
              <h2
                class="text-2xl font-bold text-gray-800 flex items-center gap-2"
              >
                <div
                  class="py-2 px-3 text-white bg-secondary-red hover:to-secondary-red/50 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <UIcon
                    name="i-lucide-calendar"
                    class="size-4 text-white mx-auto"
                  />
                </div>
                Undangan Menunggu Persetujuan
              </h2>
              <div
                class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2"
              >
                <div
                  class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 w-full sm:w-auto"
                >
                  <input
                    type="date"
                    v-model="fromDate"
                    class="min-w-0 w-full bg-secondary-red text-white px-3 py-2 rounded-full text-sm font-semibold cursor-pointer"
                  />

                  <p class="text-gray-800 text-sm font-medium">s/d</p>

                  <input
                    type="date"
                    v-model="toDate"
                    :min="fromDate"
                    class="min-w-0 w-full bg-secondary-red text-white px-3 py-2 rounded-full text-sm font-semibold cursor-pointer"
                  />
                </div>

                <button
                  class="w-full sm:w-auto bg-secondary-red text-white px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                  @click="exportTamuToExcel(fromDate, toDate)"
                >
                  Export ke Excel
                </button>

                <span
                  class="w-full sm:w-auto text-center bg-secondary-red text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {{ pendingInvitations.length }} Undangan
                </span>
              </div>
            </div>

            <div v-if="loading" class="text-center py-10 text-gray-500">
              Memuat data undangan...
            </div>

            <div
              v-else-if="pendingInvitations.length === 0"
              class="text-center py-12"
            >
              <svg
                class="mx-auto text-gray-300 mb-4"
                width="64"
                height="64"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p class="text-gray-500 text-lg">
                Tidak ada undangan menunggu persetujuan
              </p>
            </div>

            <div class="space-y-4">
              <TamuCard
                v-for="invitation in paginatedTamu"
                :key="invitation.id"
                :tamu="invitation"
                @approve="handleApprove"
                @reject="handleReject"
              />
            </div>
          </div>
        </div>

        <!-- <div class="lg:col-span-1">
          <div
            class="bg-white rounded-xl shadow-md p-6 sticky top-6 max-h-[80vh] flex flex-col"
          >
            <h2
              class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 shrink-0"
            >
              <div
                class="py-2 px-3 text-white bg-secondary-red hover:bg-secondary-red/80 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <UIcon
                  name="i-lucide-calendar"
                  class="size-4 text-white mx-auto"
                />
              </div>
              Kalender Pendidikan
            </h2>

            <div class="space-y-3 mb-6 overflow-y-auto pr-2 flex-1">
              <h3
                class="font-semibold text-gray-700 text-sm uppercase sticky top-0 bg-white py-2 z-10"
              >
                Acara Disetujui
              </h3>

              <p
                v-if="approvedEvents.length === 0"
                class="text-gray-500 text-sm text-center py-4"
              >
                Belum ada acara yang disetujui
              </p>

              <-- <div
                v-for="event in approvedEvents"
                :key="event.id"
                class="bg-secondary-red/10 border-l-4 border-secondary-red rounded-lg p-3 hover:bg-secondary-red/20 transition-colors"
              >
                <div class="flex items-start gap-2 mb-2">
                  <div
                    class="py-2 px-3 text-white bg-secondary-red rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <UIcon
                      name="i-lucide-check"
                      class="size-4 text-white mx-auto"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-800 text-sm truncate">
                      {{ event.description }}
                    </p>
                    <p class="text-gray-600 text-xs">{{ event.title }}</p>
                  </div>
                </div>
              </div> -->
        <!-- </div>

            <div class="border-t pt-4 shrink-0">
              <div class="flex items-center justify-between text-sm mb-2">
                <span class="text-gray-600">Total Acara Disetujui</span>
                <span class="font-bold text-primary-gray">{{
                  approvedEvents.length
                }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Menunggu Persetujuan</span>
                <span class="font-bold text-primary-gray">{{
                  pendingInvitations.length
                }}</span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div
      v-if="!loading && !error && totalPages > 1"
      class="flex justify-center items-center gap-4 mt-10"
    >
      <button
        class="px-3 py-1 bg-secondary-red rounded-md hover:bg-secondary-red/50 text-white disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        ← Prev
      </button>

      <span class="font-medium text-gray-700">
        Halaman {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        class="px-3 py-1 bg-secondary-red rounded-md hover:bg-secondary-red/50 text-white disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  tamuList,
  fetchAllTamu,
  approveTamu,
  rejectTamu,
  exportTamuToExcel,
  loading,
  error,
} = UseTamu();

const fromDate = ref("");
const toDate = ref("");

const showNotification = ref(false);
const notificationMessage = ref("");
const approvedEvents = computed(() =>
  tamuList.value.filter((t) => t.status === "approved"),
);
const pendingInvitations = computed(() =>
  tamuList.value.filter((t) => t.status === "pending"),
);

onMounted(() => {
  fetchAllTamu();
});

async function handleApprove(tamuId: number) {
  await approveTamu(tamuId);
  notificationMessage.value = "Tamu berhasil disetujui!";
  showNotification.value = true;
  await fetchAllTamu();
  setTimeout(() => (showNotification.value = false), 2000);
}

async function handleReject(tamuId: number) {
  const reason = prompt("Masukkan alasan penolakan:");
  if (!reason) return;
  await rejectTamu(tamuId, reason);
  notificationMessage.value = "Tamu berhasil ditolak.";
  showNotification.value = true;
  await fetchAllTamu();
  setTimeout(() => (showNotification.value = false), 2000);
}

const currentPage = ref(1);
const perPage = 6;

const totalPages = computed(() =>
  Math.ceil(pendingInvitations.value.length / perPage),
);

const paginatedTamu = computed(() => {
  if (!Array.isArray(pendingInvitations.value)) return [];
  const start = (currentPage.value - 1) * perPage;
  return pendingInvitations.value.slice(start, start + perPage);
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
