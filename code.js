// Toggle question cards
document.addEventListener("DOMContentLoaded", function () {
  const questionCards = document.querySelectorAll(".question-card");

  questionCards.forEach((card) => {
    const header = card.querySelector(".question-header");
    header.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });
});

// Demo functions
function demoReverse() {
  const input = document.getElementById("reverseInput").value;
  const arr = input.split(",").map((x) => parseInt(x.trim()));

  if (arr.some(isNaN)) {
    document.getElementById("reverseOutput").textContent =
      "Please enter valid numbers separated by commas.";
    return;
  }

  const original = [...arr];
  const reversed = reverseArray([...arr]);

  document.getElementById(
    "reverseOutput"
  ).textContent = `Original: [${original.join(
    ", "
  )}]\nReversed: [${reversed.join(", ")}]`;
}

function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }

  return arr;
}

function demoKadane() {
  const input = document.getElementById("kadaneInput").value;
  const arr = input.split(",").map((x) => parseInt(x.trim()));

  if (arr.some(isNaN)) {
    document.getElementById("kadaneOutput").textContent =
      "Please enter valid numbers separated by commas.";
    return;
  }

  const maxSum = maxSubarraySum(arr);

  document.getElementById("kadaneOutput").textContent = `Array: [${arr.join(
    ", "
  )}]\nMaximum Subarray Sum: ${maxSum}`;
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

  if (arr.some(isNaN)) {
    document.getElementById("duplicateOutput").textContent =
      "Please enter valid numbers separated by commas.";
    return;
  }

  const duplicate = findDuplicateSimple(arr);

  document.getElementById("duplicateOutput").textContent = `Array: [${arr.join(
    ", "
  )}]\nDuplicate Number: ${duplicate}`;
}

function findDuplicateSimple(nums) {
  // Simple approach using Set for demo
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) {
      return num;
    }
    seen.add(num);
  }
  return -1;
}

function demoRotatedSearch() {
  const arrayInput = document.getElementById("rotatedArrayInput").value;
  const targetInput = document.getElementById("rotatedTargetInput").value;

  const arr = arrayInput.split(",").map((x) => parseInt(x.trim()));
  const target = parseInt(targetInput.trim());

  if (arr.some(isNaN) || isNaN(target)) {
    document.getElementById("rotatedOutput").textContent =
      "Please enter valid numbers.";
    return;
  }

  const index = searchRotated(arr, target);

  document.getElementById("rotatedOutput").textContent = `Array: [${arr.join(
    ", "
  )}]\nTarget: ${target}\nFound at index: ${
    index === -1 ? "Not found" : index
  }`;
}

function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

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

  if (arr1.some(isNaN) || arr2.some(isNaN)) {
    document.getElementById("mergeOutput").textContent =
      "Please enter valid numbers separated by commas.";
    return;
  }

  // Filter out zeros from arr1 to get actual elements
  const actualArr1 = arr1.filter((x) => x !== 0);
  const mergedArray = [...actualArr1, ...arr2].sort((a, b) => a - b);

  document.getElementById(
    "mergeOutput"
  ).textContent = `Array 1: [${actualArr1.join(", ")}]\nArray 2: [${arr2.join(
    ", "
  )}]\nMerged: [${mergedArray.join(", ")}]`;
}

function demoPrefix() {
  const input = document.getElementById("prefixInput").value;
  const strings = input.split(",").map((s) => s.trim());

  if (strings.length === 0) {
    document.getElementById("prefixOutput").textContent =
      "Please enter strings separated by commas.";
    return;
  }

  const prefix = longestCommonPrefix(strings);

  document.getElementById("prefixOutput").textContent = `Strings: [${strings
    .map((s) => `"${s}"`)
    .join(", ")}]\nLongest Common Prefix: "${prefix}"`;
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
    document.getElementById("palindromeOutput").textContent =
      "Please enter a string.";
    return;
  }

  const result = isPalindrome(input);
  const cleanStr = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  document.getElementById(
    "palindromeOutput"
  ).textContent = `Original: "${input}"\nCleaned: "${cleanStr}"\nIs Palindrome: ${
    result ? "Yes" : "No"
  }`;
}

function isPalindrome(s) {
  const cleanStr = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let left = 0;
  let right = cleanStr.length - 1;

  while (left < right) {
    if (cleanStr[left] !== cleanStr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

function demoStrStr() {
  const haystack = document.getElementById("haystackInput").value;
  const needle = document.getElementById("needleInput").value;

  if (!haystack || !needle) {
    document.getElementById("strstrOutput").textContent =
      "Please enter both haystack and needle.";
    return;
  }

  const index = strStr(haystack, needle);

  document.getElementById(
    "strstrOutput"
  ).textContent = `Haystack: "${haystack}"\nNeedle: "${needle}"\nFound at index: ${
    index === -1 ? "Not found" : index
  }`;
}

function strStr(haystack, needle) {
  if (needle === "") return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;

    while (j < needle.length && haystack[i + j] === needle[j]) {
      j++;
    }

    if (j === needle.length) {
      return i;
    }
  }

  return -1;
}

function demoRotateArray() {
  const arrayInput = document.getElementById("rotateArrayInput").value;
  const kInput = document.getElementById("rotateKInput").value;

  const arr = arrayInput.split(",").map((x) => parseInt(x.trim()));
  const k = parseInt(kInput.trim());

  if (arr.some(isNaN) || isNaN(k)) {
    document.getElementById("rotateArrayOutput").textContent =
      "Please enter valid numbers.";
    return;
  }

  const original = [...arr];
  const rotated = rotateArray([...arr], k);

  document.getElementById(
    "rotateArrayOutput"
  ).textContent = `Original: [${original.join(
    ", "
  )}]\nRotated by ${k} steps: [${rotated.join(", ")}]`;
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
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

function demoMissingNumber() {
  const input = document.getElementById("missingInput").value;
  const arr = input.split(",").map((x) => parseInt(x.trim()));

  if (arr.some(isNaN)) {
    document.getElementById("missingOutput").textContent =
      "Please enter valid numbers separated by commas.";
    return;
  }

  const missing = findMissingNumber(arr);

  document.getElementById("missingOutput").textContent = `Array: [${arr.join(
    ", "
  )}]\nMissing Number: ${missing}`;
}

function findMissingNumber(nums) {
  const n = nums.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
}
