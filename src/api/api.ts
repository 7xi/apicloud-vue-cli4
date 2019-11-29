'use strict';
import {
  // get,
  post,
} from '@/util/http';

// 首页-轮播图-#1
export const reqBanner = (params: any) => post('api/banner', params);

// 新闻列表-#3
export const reqNews = (params: any) => post('api/news', params);

// 产品列表-#3
export const reqProduct = (params: any) => post('api/product', params);
