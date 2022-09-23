import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banners: [],
  cities: [],
  categories: [],
  users: [],
  studiolist: [],
  premiumDatalist: [],
  PricesList: [],
  HireList: [],
  contactslist: [],
}

export const webData = createSlice({
  name: 'dances',
  initialState,
  reducers: {
    addBanners: (state, action) => {
      state.banners = action.payload
    },
    addCities: (state, action) => {
      state.cities = action.payload
    },
    addCategories: (state, action) => {
      state.categories = action.payload
    },
    addUsers: (state, action) => {
      state.users = action.payload
    },
    addStudiolist: (state, action) => {
      state.studiolist = action.payload
    },
    addPremiumData: (state, action) => {
      state.premiumDatalist = action.payload
    },
    addPricesList: (state, action) => {
      state.PricesList = action.payload
    },
    addHireList: (state, action) => {
      state.HireList = action.payload
    },
    addContact: (state, action) => {
      state.contactslist = action.payload
    },
  },
})

export const { addContact, addBanners, addCities, addCategories, addUsers, addStudiolist, addPremiumData, addPricesList, addHireList } = webData.actions

export default webData.reducer