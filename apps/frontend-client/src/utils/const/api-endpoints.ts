export const API_ENDPOINTS = {
    // AUTH SERVICE
    SIGN_UP: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signup`,
    VERIFY: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/verify`,
    SIGN_IN: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/login`,
    SIGN_OUT: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signout`,
    REFRESH: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/refresh-token`,
    SIGN_IN_WITH_GOOGLE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/google`,
    // CORPORATE SERVICE
    CORPARATE_SIGNIN: `${process.env.NEXT_PUBLIC_CORPORATE_ENDPOINT}/login`,
    CORPARATE_SIGNUP: `${process.env.NEXT_PUBLIC_CORPORATE_ENDPOINT}/signup`,
    CORPARATE_VERIFY: `${process.env.NEXT_PUBLIC_CORPORATE_ENDPOINT}/verify`,
    CORPARATE_USER_PROFILE: `http://localhost:4000/v1/corporate/profile/me`,
    // USER SERVICE
    USER_PROFILE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me`,
    USER_PROFILE_UPDATE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/photo`,
    // PUSH NOTIFICATION SERVICE
    SUBSCRIBE: `${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_ENDPOINT}/subscribe`,

    // FAVORITE
    FAVORITE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me/favorites`,

    // JOB SERVICE
    JOBS: `${process.env.NEXT_PUBLIC_JOB_ENDPOINT}`,
    SEARCH_HISTORY: `${process.env.NEXT_PUBLIC_JOB_ENDPOINT}/search-history`,
    SEARCH_TRENDING: `${process.env.NEXT_PUBLIC_JOB_ENDPOINT}/search-trending`,

    // CHAT SERVICE
    CONVERSATIONS: `${process.env.NEXT_PUBLIC_CONVERSATION_ENDPOINT}`,
    GET_CONVERSATIONS: `${process.env.NEXT_PUBLIC_CONVERSATION_ENDPOINT}/get/conversations`,
    GET_PROFILE_COMPANY: `${process.env.NEXT_PUBLIC_COMPANY_ENDPOINT}/getMulti/Profile`,
    GET_MESSAGE: `${process.env.NEXT_PUBLIC_CONVERSATION_ENDPOINT}`,
}

export const API_ENDPOINTS_SERVER = {
    // USER SERVICE
    USER_PROFILE: `/${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me`,
}