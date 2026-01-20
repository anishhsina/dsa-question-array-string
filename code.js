// Enhanced toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const questionCards = document.querySelectorAll(".question-card");
  const searchInput = document.getElementById("searchInput");

  // Toggle cards
  questionCards.forEach((card) => {
    const header = card.querySelector(".question-header");
    header.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });

  // Search functionality
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    questionCards.forEach((card) => {
      const title = card
        .querySelector(".question-title")
        .textContent.toLowerCase();
      const keywords = card.dataset.keywords || "";

      if (title.includes(query) || keywords.includes(query)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Copy code functionality
function copyCode(button) {
  const codeBlock = button
    .closest(".code-section")
    .querySelector(".code-block");
  const text = codeBlock.textContent;

  navigator.clipboard.writeText(text).then(() => {
    button.textContent = "Copied!";
    button.classList.add("copied");

    setTimeout(() => {
      button.textContent = "Copy";
      button.classList.remove("copied");
    }, 2000);
  });
}

// Validation helper
function validateInput(arr, outputId) {
  if (arr.some(isNaN)) {
    const output = document.getElementById(outputId);
    output.textContent = "⚠️ Please enter valid numbers separated by commas.";
    output.classList.add("error");
    output.classList.remove("success");
    return false;
  }
  return true;
}

function setOutput(outputId, text, isSuccess = true) {
  const output = document.getElementById(outputId);
  output.textContent = text;
  if (isSuccess) {
    output.classList.add("success");
    output.classList.remove("error");
  } else {
    output.classList.add("error");
    output.classList.remove("success");
  }
}

// Demo Functions
function demoReverse() {
  const input = document.getElementById("reverseInput").value;
  const arr = input.split(",").map((x) => parseInt(x.trim()));

  if (!validateInput(arr, "reverseOutput")) return;

  const original = [...arr];
  const reversed = reverseArray([...arr]);

  setOutput(
    "reverseOutput",
    `✅ Original: [${original.join(", ")}]\n🔄 Reversed: [${reversed.join(
      ", "
    )}]`
  );
}

function reverseArray(arr) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

function demoKadane() {
  const input = document.getElementById("kadaneInput").value;
  const arr = input.split(",").map((x) => parseInt(x.trim()));

  if (!validateInput(arr, "kadaneOutput")) return;

  const maxSum = maxSubarraySum(arr);
  setOutput(
    "kadaneOutput",
    `📊 Array: [${arr.join(", ")}]\n💰 Maximum Subarray Sum: ${maxSum}`
  );
}

function maxSubarraySum(arr) {
  if (arr.length === 0) return 0;
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];

  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

function demoDuplicate() {
  const input = document.getElementById("duplicateInput").value;
  const arr = input.split(",").map((x) => parseInt(x.trim()));

  if (!validateInput(arr, "duplicateOutput")) return;

  const duplicate = findDuplicate(arr);
  setOutput(
    "duplicateOutput",
    `📊 Array: [${arr.join(", ")}]\n🔍 Duplicate Number: ${
      duplicate !== -1 ? duplicate : "None found"
    }`
  );
}

function findDuplicate(nums) {
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
  return -1;
}

function demoRotatedSearch() {
  const arrayInput = document.getElementById("rotatedArrayInput").value;
  const targetInput = document.getElementById("rotatedTargetInput").value;

  const arr = arrayInput.split(",").map((x) => parseInt(x.trim()));
  const target = parseInt(targetInput.trim());

  if (!validateInput(arr, "rotatedOutput")) return;

  if (isNaN(target)) {
    setOutput("rotatedOutput", "⚠️ Please enter a valid target number.", false);
    return;
  }

  const index = searchRotated(arr, target);
  setOutput(
    "rotatedOutput",
    `📊 Array: [${arr.join(", ")}]\n🎯 Target: ${target}\n📍 Found at index: ${
      index !== -1 ? index : "Not found"
    }`
  );
}

function searchRotated(nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

function demoMerge() {
  const array1Input = document.getElementById("mergeArray1Input").value;
  const array2Input = document.getElementById("mergeArray2Input").value;

  const arr1 = array1Input.split(",").map((x) => parseInt(x.trim()));
  const arr2 = array2Input.split(",").map((x) => parseInt(x.trim()));

  if (
    !validateInput(arr1, "mergeOutput") ||
    !validateInput(arr2, "mergeOutput")
  )
    return;

  const mergedArray = mergeSortedArrays(arr1, arr2);
  setOutput(
    "mergeOutput",
    `📊 Array 1: [${arr1.join(", ")}]\n📊 Array 2: [${arr2.join(
      ", "
    )}]\n✅ Merged: [${mergedArray.join(", ")}]`
  );
}

function mergeSortedArrays(arr1, arr2) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }

  return result.concat(arr1.slice(i), arr2.slice(j));
}

function demoPrefix() {
  const input = document.getElementById("prefixInput").value;
  const strings = input.split(",").map((s) => s.trim());

  if (strings.length === 0 || strings.every((s) => s === "")) {
    setOutput(
      "prefixOutput",
      "⚠️ Please enter strings separated by commas.",
      false
    );
    return;
  }

  const prefix = longestCommonPrefix(strings);
  setOutput(
    "prefixOutput",
    `📝 Strings: [${strings
      .map((s) => `"${s}"`)
      .join(", ")}]\n✨ Longest Common Prefix: "${prefix}"`
  );
}

function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

function demoPalindrome() {
  const input = document.getElementById("palindromeInput").value;

  if (!input.trim()) {
    setOutput("palindromeOutput", "⚠️ Please enter a string.", false);
    return;
  }

  const result = isPalindrome(input);
  const cleanStr = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  setOutput(
    "palindromeOutput",
    `📝 Original: "${input}"\n🧹 Cleaned: "${cleanStr}"\n${
      result ? "✅" : "❌"
    } Is Palindrome: ${result ? "Yes" : "No"}`
  );
}

function isPalindrome(s) {
  const cleanStr = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let left = 0,
    right = cleanStr.length - 1;

  while (left < right) {
    if (cleanStr[left] !== cleanStr[right]) return false;
    left++;
    right--;
  }

  return true;
}

function demoRotateArray() {
  const arrayInput = document.getElementById("rotateArrayInput").value;
  const kInput = document.getElementById("rotateKInput").value;

  const arr = arrayInput.split(",").map((x) => parseInt(x.trim()));
  const k = parseInt(kInput.trim());

  if (!validateInput(arr, "rotateArrayOutput")) return;

  if (isNaN(k)) {
    setOutput(
      "rotateArrayOutput",
      "⚠️ Please enter a valid number for k.",
      false
    );
    return;
  }

  const original = [...arr];
  const rotated = rotateArray([...arr], k);

  setOutput(
    "rotateArrayOutput",
    `📊 Original: [${original.join(
      ", "
    )}]\n🔄 Rotated by ${k} steps: [${rotated.join(", ")}]`
  );
}

function rotateArray(nums, k) {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  return nums;
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

function demoMissingNumber() {
  const input = document.getElementById("missingInput").value;
  const arr = input.split(",").map((x) => parseInt(x.trim()));

  if (!validateInput(arr, "missingOutput")) return;

  const missing = findMissingNumber(arr);
  setOutput(
    "missingOutput",
    `📊 Array: [${arr.join(", ")}]\n🔍 Missing Number: ${missing}`
  );
}

function findMissingNumber(nums) {
  const n = nums.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}
