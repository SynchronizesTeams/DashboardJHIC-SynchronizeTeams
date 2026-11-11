<template>
  <div
    class="border border-secondary-red rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow bg-white/50"
  >
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4"
    >
      <div class="flex-1 min-w-0">
        <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
          {{ tamu.title }}
        </h3>
        <p class="text-gray-600 font-medium text-sm sm:text-base truncate">
          {{ tamu.instance_name }}
        </p>
      </div>
      <!-- <span
        class="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold w-fit"
        :class="{
          'bg-yellow-100 text-yellow-800': tamu.status === 'pending',
          'bg-green-100 text-green-800': tamu.status === 'approved',
          'bg-red-100 text-red-800': tamu.status === 'rejected',
        }"
      >
        {{
          tamu.status === "pending"
            ? "Menunggu"
            : tamu.status === "approved"
              ? "Disetujui"
              : "Ditolak"
        }}
      </span> -->
      <span
        class="px-3 py-1 rounded-full border border-red-100 text-xs sm:text-sm, font-semibold w-fit"
      >
        {{ tamu.created_at.slice(0, 10) }}
      </span>
    </div>

    <!-- Contact Info Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
      <div class="flex items-start gap-2">
        <svg
          class="text-gray-400 mt-0.5 flex-shrink-0"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <div class="min-w-0 flex-1">
          <p class="text-sm text-gray-500">Email</p>
          <p class="text-gray-800 text-sm sm:text-base truncate">
            {{ tamu.email }}
          </p>
        </div>
      </div>
      <div class="flex items-start gap-2">
        <svg
          class="text-gray-400 mt-0.5 flex-shrink-0"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <div class="min-w-0 flex-1">
          <p class="text-sm text-gray-500">Telepon</p>
          <p class="text-gray-800 text-sm sm:text-base truncate">
            {{ tamu.phone }}
          </p>
        </div>
      </div>
    </div>

    <!-- Description Section -->
    <div
      class="bg-gray-50 border border-secondary-red rounded-lg p-3 sm:p-4 mb-4"
    >
      <p class="text-sm text-gray-500 mb-1">Deskripsi</p>
      <p class="text-gray-800 font-medium text-sm sm:text-base">
        {{ tamu.description }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <!-- <button
        @click="$emit('approve', tamu.id)"
        class="flex-1 bg-secondary-blue hover:bg-secondary-blue/50 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
      >
        <svg
          class="flex-shrink-0"
          width="18"
          height="18"
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
        <span class="truncate">Setujui & Tambah ke Kalender</span>
      </button>

      <button
        @click="$emit('reject', tamu.id)"
        class="flex-1 bg-secondary-red hover:bg-secondary-red/40 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
      >
        <svg
          class="flex-shrink-0"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="truncate">Tolak</span>
      </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tamu } from "~/types/main.type";

defineProps<{ tamu: Tamu }>();
defineEmits(["approve", "reject"]);
</script>
