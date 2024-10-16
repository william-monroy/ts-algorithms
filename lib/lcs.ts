type LCSResult = { pos1: number, pos2: number, length: number};

function LCS(s1: string, s2: string): LCSResult {
    let max = 0;
    const n1 = s1.length;
    const n2 = s2.length;
    let endPos1 = 0, endPos2 = 0;
    const M: number[][] = Array.from({ length: n1 + 1 }, () => Array(n2 + 1).fill(0));

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

    return { pos1: endPos1 - max, pos2: endPos2 - max, length: max };
}