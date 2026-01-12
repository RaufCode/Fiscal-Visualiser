<template>
  <div :class="'bg-' + color + '-50 border-l-4 border-' + color + '-500 p-4 mt-6'">
        <div class="flex items-start">
            <i :class="'fa-solid fa-lightbulb text-' + color + '-500 mt-1 mr-3'"></i>
            <div>
                <h4 :class="'font-bold text-' + color + '-900 text-sm'">{{ title }}</h4>
                <p :class="'text-sm text-' + color + '-800'"><slot></slot></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  color: string
  title: string
}>()

</script>
