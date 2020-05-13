import {
  reqCategories, reqAddCategory, reqUpdateCategory, reqDeleteCategory
} from '../../api';
import {
  GET_CATEGORIES_MESSAGE, ADD_CATEGORY_MESSAGE, UPDATE_CATEGORY_MESSAGE, DELETE_CATEGORY_MESSAGE
} from "../action-types/index";

const getCategories = categories => {
  return {
    type: GET_CATEGORIES_MESSAGE,
    data: categories
  };
};

const addCategory = category => {
  return {
    type: ADD_CATEGORY_MESSAGE,
    data: category
  };
};

const updateCategory = category => {
  return {
    type: UPDATE_CATEGORY_MESSAGE,
    data: category
  };
};

const deleteCategory = (categoryId) => {
  return {
    type: DELETE_CATEGORY_MESSAGE,
    data: categoryId
  }
}
// 定义异步的action - creator, 使用异步的thunk

// 获取商品分类
export const getCategoriesAsync = () => {
  return dispatch => {
    return reqCategories()
      .then((response) => {
        dispatch(getCategories(response))
      })
  }
}

// 添加分类
export const addCategoryAsync = (categoryName) => {
  return dispatch => {
    return reqAddCategory(categoryName)
      .then((response) => {
        dispatch(addCategory(response))
      })
  }
}

// 添加分类
export const updateCategoryAsync = (categoryId, categoryName) => {
  return dispatch => {
    return reqUpdateCategory(categoryId, categoryName)
      .then((response) => {
        dispatch(updateCategory(response))
      })
  }
}


// 删除分类
export const deleteCategoryAsync = (categoryId) => {
  return dispatch => {
    return reqDeleteCategory(categoryId)
      .then((response) => {
        dispatch(deleteCategory(response))
      })
  }
}

