import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

class Collaborative:
    def __init__(self, users, products, ratings):
        self.users = users
        self.products = products
        self.ratings = ratings
    def fit(self):
        self.user_item_matrix = self.ratings.pivot_table(values='rating', index='user_id', columns='product_id')
        self.user_similarities = cosine_similarity(self.user_item_matrix.fillna(0))  # Fill missing values with 0
    def predict(self, user_id, top_n=4):
        user_index = self.users.index.get_loc(int(user_id))
        print(user_index)
        similar_users_scores = self.user_similarities[user_index]
        similar_users_scores[user_index] = 0
        similar_users = similar_users_scores.argsort()[-top_n-1:-1]  # Get indices of top similar users
        print(similar_users_scores)
        recommended_items = []
        for similar_user in similar_users:
            top_rated_items = self.user_item_matrix.iloc[similar_user].sort_values(ascending=False).index[:top_n]
            recommended_items.extend(top_rated_items.tolist())
        return list(set(recommended_items))  # Remove duplicates