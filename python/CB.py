import pandas as pd
from processing import *

class CB(object):
    """
        Khởi tại dataframe "productList" với hàm "getDataFrameProductsCsv"
    """
    def __init__(self, movies_csv):
        self.productList = getDataFrameProductsCsv(movies_csv)
        self.tfidf_matrix = None
        self.cosine_sim = None

    def build_model(self):
        """
            Tách các giá trị của type ở từng product đang được ngăn cách bởi '|'
        """
        self.productList['genres'] = self.productList['genres'].str.split('|')
        self.productList['genres'] = self.productList['genres'].fillna("").astype('str')
        self.tfidf_matrix = tfidf_matrix(self.productList)
        self.cosine_sim = cosine_sim(self.tfidf_matrix)

    def refresh(self):
        """
             Chuẩn hóa dữ liệu và tính toán lại ma trận
        """
        self.build_model()

    def fit(self):
        self.refresh()
    
    def genre_recommendations(self, items, title, top_x):
        """
            Xây dựng hàm trả về danh sách top product tương đồng theo tên product truyền vào:
            + Tham số truyền vào gồm "title" là tên product và "topX" là top product tương đồng cần lấy
            + Tạo ra list "sim_score" là danh sách điểm tương đồng với product truyền vào
            + Sắp xếp điểm tương đồng từ cao đến thấp
            + Trả về top danh sách tương đồng cao nhất theo giá trị "topX" truyền vào
        """
        titles = self.productList['productid']
        indices = pd.Series(titles.index, index=self.productList['productid'])
        index_of_product_id = items.index.get_loc(title)
        idx = indices[index_of_product_id]
        sim_scores = list(enumerate(self.cosine_sim[idx]))
        print(index_of_product_id)
        print(sim_scores)
        sim_scores.pop(index_of_product_id)
        sim_scores = bubbleSort(sim_scores)
        sim_scores = sim_scores[0:top_x]
        
        product_indices = [i[0] for i in sim_scores]
        print(titles.iloc[product_indices].values)
        return sim_scores, titles.iloc[product_indices].values

def bubbleSort(arr):
    tempArr = arr
    n = len(tempArr)
    # optimize code, so if the array is already sorted, it doesn't need
    # to go through the entire process
    # Traverse through all array elements
    for i in range(n-1):
        # range(n) also work but outer loop will
        # repeat one time more than needed.
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # traverse the array from 0 to n-i-1
            # Swap if the element found is greater
            # than the next element
            if tempArr[j][1] < tempArr[j + 1][1]:
                tempArr[j], tempArr[j + 1] = tempArr[j + 1], tempArr[j]
         
    return tempArr