<template>
  <div v-if="items_" class="tyr-field tyr-multi-select-field" :class="{'tyr-multi-select-field-block': block}">
    <button
      v-for="key in keys_"
      :key="key"
      class="btn tyr-multi-select-field-element mb-1"
      :class="{'btn-primary': computedItems[key].selected, 'btn-outline-primary': !computedItems[key].selected}"
      @click="onSelect(key)">
      <span>{{items_[key].name}}</span>
    </button>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {MultiSelectItems} from '@/components/common/controls/multi-select-items';

  @Component
  export default class MultiSelectField extends Vue implements ComponentOptions<MultiSelectField> {
    @Prop({type: Boolean, default: false}) block: boolean;
    @Prop() value: MultiSelectItems;
    @Prop({default: 0}) minSelected: number;

    items_: MultiSelectItems = {};
    keys_: string[] = [];
    selectedCount = 1;

    get computedItems(): MultiSelectItems {
      return this.items_;
    }

    created(): void {
      this.items_ = this.updateItems(this.value);
      console.log('created', JSON.stringify(this.value));
    }

    mounted(): void {
      console.log('mounted', JSON.stringify(this.items_));
    }

    @Watch('value')
    watchItems(values: MultiSelectItems) {
      this.items_ = this.updateItems(values);
      console.log('watchItems', JSON.stringify(this.items_));
    }

    updateItems(values: MultiSelectItems): MultiSelectItems {
      const items: MultiSelectItems = {};
      this.keys_ = Object.keys(values);
      this.keys_.forEach(key => items[key] = {
        name: values[key].name,
        selected: values[key].selected || false,
        value: values[key].value
      });
      return items;
    }

    onSelect(key: string) {
      const item = this.items_[key];
      if (this.selectedCount >= this.minSelected || !item.selected) {
        item.selected = !item.selected;
        this.selectedCount += item.selected ? 1 : -1;
      }
      this.$emit('input', this.items_);
      console.log('onSelect', JSON.stringify(this.items_));
    }
  }
</script>

<style lang="scss" scoped>

</style>
