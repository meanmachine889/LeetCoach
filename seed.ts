const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const newQuestionsData = [
    {
      name: 'Find the Missing Number',
      question: 'Given an array of integers from 1 to n with one missing number, find the missing number.',
      codeFrame: `
        #include <iostream>
        using namespace std;

        int findMissingNumber(vector<int>& nums, int n) {
            // Write your code here
        }

        int main() {
            vector<int> nums1 = {1, 2, 4, 5, 6};
            int n1 = 6;
            int result1 = findMissingNumber(nums1, n1);
            cout << "Result 1: " << result1 << endl; // Expected output: 3

            vector<int> nums2 = {3, 7, 1, 2, 8, 4, 5};
            int n2 = 8;
            int result2 = findMissingNumber(nums2, n2);
            cout << "Result 2: " << result2 << endl; // Expected output: 6

            return 0;
        }
      `,
      solution: `
        int findMissingNumber(vector<int>& nums, int n) {
            int totalSum = n * (n + 1) / 2;
            int arraySum = accumulate(nums.begin(), nums.end(), 0);
            return totalSum - arraySum;
        }
      `,
      difficulty: 'Medium',
      testcases: [
        { input: '{1, 2, 4, 5, 6}, 6', output: '3' },
        { input: '{3, 7, 1, 2, 8, 4, 5}, 8', output: '6' },
      ],
    },
    {
      name: 'Longest Substring Without Repeating Characters',
      question: 'Find the length of the longest substring without repeating characters.',
      codeFrame: `
        #include <iostream>
        using namespace std;

        int lengthOfLongestSubstring(string s) {
            // Write your code here
        }

        int main() {
            string result1 = lengthOfLongestSubstring("abcabcbb");
            cout << "Result 1: " << result1 << endl; // Expected output: 3

            string result2 = lengthOfLongestSubstring("bbbbb");
            cout << "Result 2: " << result2 << endl; // Expected output: 1

            return 0;
        }
      `,
      solution: `
        int lengthOfLongestSubstring(string s) {
            vector<int> chars(256, -1);
            int maxLength = 0, left = 0;
            for (int right = 0; right < s.length(); right++) {
                if (chars[s[right]] >= left) {
                    left = chars[s[right]] + 1;
                }
                chars[s[right]] = right;
                maxLength = max(maxLength, right - left + 1);
            }
            return maxLength;
        }
      `,
      difficulty: 'Medium',
      testcases: [
        { input: '"abcabcbb"', output: '3' },
        { input: '"bbbbb"', output: '1' },
      ],
    },
    {
      name: 'Trapping Rain Water',
      question: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
      codeFrame: `
        #include <iostream>
        using namespace std;

        int trap(vector<int>& height) {
            // Write your code here
        }

        int main() {
            vector<int> height1 = {0,1,0,2,1,0,1,3,2,1,2,1};
            int result1 = trap(height1);
            cout << "Result 1: " << result1 << endl; // Expected output: 6

            vector<int> height2 = {4,2,0,3,2,5};
            int result2 = trap(height2);
            cout << "Result 2: " << result2 << endl; // Expected output: 9

            return 0;
        }
      `,
      solution: `
        int trap(vector<int>& height) {
            int n = height.size();
            int left = 0, right = n - 1, leftMax = 0, rightMax = 0, trappedWater = 0;
            while (left < right) {
                if (height[left] < height[right]) {
                    if (height[left] >= leftMax) {
                        leftMax = height[left];
                    } else {
                        trappedWater += leftMax - height[left];
                    }
                    left++;
                } else {
                    if (height[right] >= rightMax) {
                        rightMax = height[right];
                    } else {
                        trappedWater += rightMax - height[right];
                    }
                    right--;
                }
            }
            return trappedWater;
        }
      `,
      difficulty: 'Hard',
      testcases: [
        { input: '{0,1,0,2,1,0,1,3,2,1,2,1}', output: '6' },
        { input: '{4,2,0,3,2,5}', output: '9' },
      ],
    },
    {
      name: 'Median of Two Sorted Arrays',
      question: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
      codeFrame: `
        #include <iostream>
        using namespace std;

        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
            // Write your code here
        }

        int main() {
            vector<int> nums1 = {1, 3};
            vector<int> nums2 = {2};
            double result1 = findMedianSortedArrays(nums1, nums2);
            cout << "Result 1: " << result1 << endl; // Expected output: 2.0

            vector<int> nums3 = {1, 2};
            vector<int> nums4 = {3, 4};
            double result2 = findMedianSortedArrays(nums3, nums4);
            cout << "Result 2: " << result2 << endl; // Expected output: 2.5

            return 0;
        }
      `,
      solution: `
        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
            vector<int> merged;
            merge(nums1.begin(), nums1.end(), nums2.begin(), nums2.end(), back_inserter(merged));
            int n = merged.size();
            if (n % 2 == 0) {
                return (merged[n / 2 - 1] + merged[n / 2]) / 2.0;
            } else {
                return merged[n / 2];
            }
        }
      `,
      difficulty: 'Hard',
      testcases: [
        { input: '{1, 3}, {2}', output: '2.0' },
        { input: '{1, 2}, {3, 4}', output: '2.5' },
      ],
    },
    {
      name: 'Word Break',
      question: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.',
      codeFrame: `
        #include <iostream>
        using namespace std;

        bool wordBreak(string s, vector<string>& wordDict) {
            // Write your code here
        }

        int main() {
            vector<string> wordDict1 = {"leet", "code"};
            string s1 = "leetcode";
            bool result1 = wordBreak(s1, wordDict1);
            cout << "Result 1: " << result1 << endl; // Expected output: true

            vector<string> wordDict2 = {"apple", "pen"};
            string s2 = "applepenapple";
            bool result2 = wordBreak(s2, wordDict2);
            cout << "Result 2: " << result2 << endl; // Expected output: true

            return 0;
        }
      `,
      solution: `
        bool wordBreak(string s, vector<string>& wordDict) {
            unordered_set<string> dict(wordDict.begin(), wordDict.end());
            vector<bool> dp(s.size() + 1, false);
            dp[0] = true;
            for (int i = 1; i <= s.size(); i++) {
                for (int j = 0; j < i; j++) {
                    if (dp[j] && dict.count(s.substr(j, i - j))) {
                        dp[i] = true;
                        break;
                    }
                }
            }
            return dp[s.size()];
        }
      `,
      difficulty: 'Medium',
      testcases: [
        { input: '"leetcode", {"leet", "code"}', output: 'true' },
        { input: '"applepenapple", {"apple", "pen"}', output: 'true' },
      ],
    },
  ];

  for (const questionData of newQuestionsData) {
    await prisma.question.create({
      data: {
        name: questionData.name,
        question: questionData.question,
        codeFrame: questionData.codeFrame,
        solution: questionData.solution,
        difficulty: questionData.difficulty,
        testcases: {
          create: questionData.testcases.map((testcase) => ({
            input: testcase.input,
            output: testcase.output,
          })),
        },
      },
    });
  }
}

main()
  .then(() => console.log('Questions added successfully!'))
  .catch((error) => console.error('Error adding questions:', error))
  .finally(async () => await prisma.$disconnect());
