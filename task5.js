//You are given an integer array nums and you have to return a new counts array where counts[i] is the number of smaller elements to the right of nums[i].

function rightmostCount(nums) {
    const counts = [];

    for (let i = 0; i < nums.length; i++) {
        let count = 0;

        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[i]) {
                count++;
            }
        }

        counts[i] = count;
    }

    return counts;
}

const nums = [5, 4, 3, 2, 8, 9, 5];
console.log("Counts array:", rightmostCount(nums));
