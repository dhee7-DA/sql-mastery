# 🔬 Day 19 Solutions Breakdown: Gaps and Islands Autopsies

---

## Query 1: Row-Number Difference Autopsy
### The Mathematical Proof:
Let $T_i$ be the $i$-th date in a streak starting at day $S$.
Since the dates are strictly consecutive:
$$ T_i = S + (i - 1) $$
The row number for this element within the partition is:
$$ R_i = i $$
Subtracting $R_i$ days from $T_i$:
$$ T_i - R_i = (S + i - 1) - i = S - 1 $$
Notice that $S - 1$ is **strictly independent of $i$**! Every member of the streak evaluates to the exact identical anchor date $(S - 1)$.
The moment a gap occurs, the starting anchor $S$ changes, shifting the constant.
- **Time Complexity**: $\mathcal{O}(N \log N)$ for sorting the partition, followed by a linear $\mathcal{O}(N)$ stream.
