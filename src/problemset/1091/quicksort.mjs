const partition = (A, pivot, low, high) => {
    let left = low;
    let right = low;
    let upper = high;
    while (right <= upper) {
        if (A[right] < pivot) {
            [A[left], A[right]] = [A[right], A[left]];
            left += 1;
            right += 1;
        } else if (A[right] > pivot) {
            [A[right], A[upper]] = [A[upper], A[right]];
            upper -= 1;
        } else {
            right += 1;
        }
    }
    return [left, right];
};

const QuickSort = (A, low = 0, high = A.length - 1) => {
    if (low < high) {
        const pivot = A[(high + low) >> 1];
        // console.log(low, high, pivot);
        const [left, right] = partition(A, pivot, low, high);
        QuickSort(A, low, left - 1);
        QuickSort(A, right, high);
    }
    return A;
};

export default QuickSort;
