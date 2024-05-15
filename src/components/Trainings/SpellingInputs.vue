<!-- <template lang="pug">
input(v-for="(char, index) in inputs"
  :key="index"
  :model-value="inputs[index]"
  @input="handleInput($event, index)"
  @keydown.backspace="handleBackspace($event, index)"
  @keydown.enter="setAnswer(inputs.join(''));"
  ref="charInput"
  maxlength="1"
  class="character-input"
  @update:model-value="updateInputs()"
  )
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  inputs: Array[''],
  setAnswer: Function,
  inputLength: Number,
});

const charInput = ref([]);
const inputValue = ref();

const handleInput = (event, index) => {
  if (event.inputType === 'insertText') {
    if (index < inputLength.value - 1) {
      nextTick(() => {
        charInput.value[index + 1].focus();
      });
    }
  }
};

const handleBackspace = (event, index) => {
  if (index > 0 && inputs.value[index] === '') {
    nextTick(() => {
      charInput.value[index - 1].focus();
    });
  }
};

const emit = defineEmits(['update-inputs']);
</script>

<style lang="scss" scoped>
.character-inputs {
  padding-block: 16px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.character-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 24px;
}
</style> -->
