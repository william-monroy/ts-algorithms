import { z } from "./z";

function LCS(s1: string, s2: string): string {
  let max = 0;
  const n1 = s1.length;
  const n2 = s2.length;
  let endPos1 = 0,
    endPos2 = 0;
  const M: number[][] = Array.from({ length: n1 + 1 }, () =>
    Array(n2 + 1).fill(0)
  );

  for (let i = 1; i <= n1; i++) {
    for (let j = 1; j <= n2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        M[i][j] = M[i - 1][j - 1] + 1;
        if (M[i][j] > max) {
          max = M[i][j];
          endPos1 = i;
          endPos2 = j;
        }
      }
    }
  }

  if (max === 0) {
    return "";
  }

  let lcs = "";

  while (M[endPos1][endPos2] !== 0) {
    lcs = s1[endPos1 - 1] + lcs;
    endPos1--;
    endPos2--;
  }

  return lcs;
}

export function findLCS(text1: string, text2: string): number[] {
  let lcs = LCS(text1, text2);
  let positions = z(text1, lcs);

  return positions;
}
