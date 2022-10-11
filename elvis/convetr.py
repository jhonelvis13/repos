def main():
  # 4 x 4 csr matrix
  #    [1, 0, 0, 0],
  #    [2, 0, 3, 0],
  #    [0, 0, 0, 0],
  #    [0, 4, 0, 0],
  csr_values = [2, 3, 1, 4,5]
  col_idx    = [1, 2, 0, 1,1]
  row_ptr    = [0, 2, 4,5]
  csr_matrix = [
      csr_values,
      col_idx,
      row_ptr
      ]

  dense_matrix = [
      [0, 3, 0],
      [1, 4, 5],
      [2, 0, 0],
      ]

  res = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      ]

  # matrix order, assumes both matrices are square
  n = len(dense_matrix)

  # res = dense X csr
  csr_row = 0 # Current row in CSR matrix
  for i in range(n):
    start, end = row_ptr[i], row_ptr[i + 1]
    for j in range(start, end):
      col, csr_value = col_idx[j], csr_values[j]
      for k in range(n):
        dense_value = dense_matrix[k][csr_row]
        res[k][col] += csr_value * dense_value
    csr_row += 1

  print(res) 


if __name__ == '__main__':
  main()