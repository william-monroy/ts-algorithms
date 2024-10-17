function zArray(S: string): number[] {
  const n = S.length;
  const Z = new Array(n).fill(0);
  let l = 0,
    r = 0,
    k = 0;

  for (let i = 1; i < n; i++) {
    if (i > r) {
      l = r = i;
      while (r < n && S[r - l] === S[r]) {
        r++;
      }
      Z[i] = r - l;
      r--;
    } else {
      k = i - l;
      if (Z[k] < r - i + 1) {
        Z[i] = Z[k];
      } else {
        l = i;
        while (r < n && S[r - l] === S[r]) {
          r++;
        }
        Z[i] = r - l;
        r--;
      }
    }
  }

  return Z;
}

/**
 *
 * @param T Text to search
 * @param P Pattern to search in text
 * @returns Array of positions where pattern is found in text
 */
export function z(T: string, P: string): number[] {
  const S = P + "$" + T;
  const l = S.length;
  const Z = zArray(S);
  const positions: number[] = [];

  for (let i = 0; i < l; i++) {
    if (Z[i] === P.length) {
      positions.push(i - P.length - 1);
      // console.log(i - P.length - 1);
    }
  }

  return positions;
}
