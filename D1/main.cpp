
        #include <iostream>
        using namespace std;

        int product(int a, int b) {
            return a*b;
        }

        int main() {
            int result1 = product(3, 4);
            cout << "Result 1: " << result1 << endl; // Expected output: 12

            int result2 = product(7, 9);
            cout << "Result 2: " << result2 << endl; // Expected output: 63

            return 0;
        }
      