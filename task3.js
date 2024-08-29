function longestConsecutiveChain(nums) {
    if (nums.length === 0) return 0;
  
    let maxLength = 0;
    
    // Iterate over the array
    for (let i = 0; i < nums.length; i++) {
      let length = 1;
      let current = nums[i];
  
      // Track consecutive numbers
      while (i + length < nums.length && nums[i + length] === current + length) {
        length++;
      }
  
      // Update maximum length if current chain is longer
      maxLength = Math.max(maxLength, length);
    }
  
    return maxLength;
  }
  
  // Example usage:
  const nums = [5, 4,5,6,7,8, 9, 1, 2, 3,4];
  console.log(longestConsecutiveChain(nums));
  
/*
---Time Complexity
The time complexity of this function can be analyzed as follows:

Outer Loop: The for loop runs from i = 0 to i < nums.length, which means it executes n times where n is the length of the array.

Inner Loop: Inside the outer loop, there is a while loop that runs as long as nums[i + length] === current + length. In the worst case, this while loop might iterate over the remaining elements in the array starting from i. This could potentially lead to up to n iterations in total, but this is not necessarily n iterations for each iteration of the outer loop.

Combining these factors:

In the worst case, every element could potentially be checked by the while loop,
 leading to an overall time complexity of O(n).

 -----space complexity----
 Here since no addtional data structure is used for storing data so the space complexity is O(1).
*/