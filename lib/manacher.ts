import { z } from "./z";

function manacher(D: string): string {
    // Transform the input string to handle even-length palindromes
    let T = "#";
    for (const c of D) {
        T += c + "#";
    }
    const L = T.length;
    const P = new Array<number>(L).fill(0); // Array to store palindrome lengths about the center
    let C = 0, R = 0; // Center and right edge of the current palindrome

    for (let i = 1; i < L - 1; ++i) {
        const mirr = 2 * C - i; // Mirror of the current position i

        if (i < R) {
            P[i] = Math.min(R - i, P[mirr]);
        }

        // Expand the palindrome centered at i
        while (i + 1 + P[i] < L && i - 1 - P[i] >= 0 && T[i + 1 + P[i]] === T[i - 1 - P[i]]) {
            P[i]++;
        }

        // Update the center and right edge if the expanded palindrome is larger
        if (i + P[i] > R) {
            C = i;
            R = i + P[i];
        }
    }

    // Find the maximum length of the palindrome
    let maxLen = 0;
    let centerIndex = 0;
    for (let i = 1; i < L - 1; ++i) {
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }

    // Extract the longest palindromic substring
    const start = (centerIndex - maxLen) / 2;
    return D.substring(start, start + maxLen);
}

export function findPalindrom(text: string) : number[] {
    let palindrome = manacher(text);
    let positions = z(text, palindrome);
    return positions;
}