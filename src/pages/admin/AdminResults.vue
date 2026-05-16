<template>
  <AdminLayout>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Upload Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-base font-semibold text-gray-800 mb-5">
            Add Yearly Result
          </h2>

          <form @submit.prevent="handleUpload" class="space-y-5">
            <!-- Year Selection -->
            <div>
              <label
                for="res-year"
                class="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Result Year <span class="text-red-500">*</span>
              </label>
              <select
                id="res-year"
                v-model="form.year"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="" disabled>Select Year</option>
                <option v-for="y in yearOptions" :key="y" :value="y">
                  {{ y }}
                </option>
              </select>
            </div>

            <!-- Category -->
            <div>
              <label
                for="res-cat"
                class="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Category <span class="text-red-500">*</span>
              </label>
              <select
                id="res-cat"
                v-model="form.category"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="JEE">JEE (Mains/Advanced)</option>
                <option value="NEET">NEET</option>
                <option value="MHT-CET">MHT-CET</option>
                <option value="SSC">10th Board</option>
                <option value="HSC">HSC Board (12th)</option>
              </select>
            </div>

            <!-- Description / Highlights -->
            <div>
              <label
                for="res-desc"
                class="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Highlights / Description
              </label>
              <textarea
                id="res-desc"
                v-model="form.description"
                rows="3"
                placeholder="e.g., 50+ Selections in NEET 2024, 15 Students above 95%"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              ></textarea>
            </div>

            <!-- Result Poster Image -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Result Poster / Image <span class="text-red-500">*</span>
              </label>
              <div
                @click="$refs.fileInput.click()"
                :class="[
                  'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors',
                  form.file
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50',
                ]"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onFileChange"
                />
                <div v-if="!previewUrl">
                  <svg
                    class="h-10 w-10 text-gray-400 mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="text-sm text-gray-500">
                    Click to upload result poster
                  </p>
                  <p class="text-[10px] text-gray-400 mt-1">
                    Images only • Max 40MB
                  </p>
                </div>
                <img
                  v-else
                  :src="previewUrl"
                  class="h-32 w-full object-contain rounded-lg"
                />
              </div>
            </div>

            <!-- Progress Bar -->
            <div
              v-if="uploadProgress > 0 && uploadProgress < 100"
              class="space-y-1"
            >
              <div class="flex justify-between text-xs text-gray-500">
                <span>Uploading...</span>
                <span>{{ uploadProgress }}%</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full bg-blue-600 transition-all"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="uploading || !form.file"
              class="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2"
            >
              <svg
                v-if="uploading"
                class="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              {{ uploading ? "Saving..." : "Save Result" }}
            </button>
          </form>
        </div>
      </div>

      <!-- Results List -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-base font-semibold text-gray-800">
              Published Results
            </h2>
            <button
              @click="fetchResults"
              class="text-xs text-blue-600 hover:underline"
            >
              Refresh
            </button>
          </div>

          <div v-if="loading" class="space-y-4">
            <div
              v-for="i in 3"
              :key="i"
              class="h-24 bg-gray-50 rounded-2xl animate-pulse"
            ></div>
          </div>

          <div
            v-else-if="results.length === 0"
            class="text-center py-12 text-gray-400"
          >
            <p>No results added yet.</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="res in results"
              :key="res.id"
              class="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-100 transition-colors group"
            >
              <div
                class="h-16 w-16 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0"
              >
                <img :src="res.imageUrl" class="h-full w-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase"
                    >{{ res.year }}</span
                  >
                  <span
                    class="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase"
                    >{{ res.category }}</span
                  >
                </div>
                <p class="text-sm font-semibold text-gray-800 truncate">
                  {{ res.description || "Yearly Results" }}
                </p>
              </div>
              <button
                @click="confirmDelete(res)"
                class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 class="font-bold text-gray-900 mb-2">Delete Result?</h3>
        <p class="text-sm text-gray-500 mb-6">
          Are you sure you want to remove the {{ deleteTarget.year }}
          {{ deleteTarget.category }} result?
        </p>
        <div class="flex gap-3">
          <button
            @click="deleteTarget = null"
            class="flex-1 py-2 border border-gray-300 rounded-xl text-sm font-medium"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-medium"
          >
            {{ deleting ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "../../components/admin/AdminLayout.vue";
import {
  getResults,
  addResult,
  deleteResult,
} from "../../services/firestoreService";
import {
  uploadToCloudinary,
  validateFile,
} from "../../services/cloudinaryService";
import {
  showSuccess,
  showError,
} from "../../components/common/ToastNotification.vue";

export default {
  name: "AdminResults",
  components: { AdminLayout },
  data() {
    return {
      loading: true,
      results: [],
      yearOptions: Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i,
      ),
      form: { year: "", category: "", description: "", file: null },
      previewUrl: null,
      uploading: false,
      uploadProgress: 0,
      deleteTarget: null,
      deleting: false,
    };
  },
  async created() {
    await this.fetchResults();
  },
  methods: {
    async fetchResults() {
      this.loading = true;
      try {
        this.results = await getResults();
      } catch (err) {
        showError("Failed to fetch results", err.message);
      } finally {
        this.loading = false;
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      const { valid, error } = validateFile(file, "image");
      if (!valid) {
        showError("Invalid file", error);
        return;
      }
      this.form.file = file;
      this.previewUrl = URL.createObjectURL(file);
    },
    async handleUpload() {
      if (!this.form.file) return;
      this.uploading = true;
      try {
        const imageUrl = await uploadToCloudinary(
          this.form.file,
          (p) => (this.uploadProgress = p),
        );
        await addResult({
          year: this.form.year,
          category: this.form.category,
          description: this.form.description,
          imageUrl,
        });
        showSuccess("Result added!", "The yearly result has been published.");
        this.form = { year: "", category: "", description: "", file: null };
        this.previewUrl = null;
        this.uploadProgress = 0;
        await this.fetchResults();
      } catch (err) {
        showError("Upload failed", err.message);
      } finally {
        this.uploading = false;
      }
    },
    confirmDelete(res) {
      this.deleteTarget = res;
    },
    async handleDelete() {
      this.deleting = true;
      try {
        await deleteResult(this.deleteTarget.id);
        showSuccess("Result deleted", "The entry has been removed.");
        this.results = this.results.filter(
          (r) => r.id !== this.deleteTarget.id,
        );
        this.deleteTarget = null;
      } catch (err) {
        showError("Delete failed", err.message);
      } finally {
        this.deleting = false;
      }
    },
  },
};
</script>
