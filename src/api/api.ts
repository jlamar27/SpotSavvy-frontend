export const getCookie = (name: string): string | null => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
};

export const postData = async <T>(url: string, data: T, requireCsrf: boolean = true): Promise<Response> => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (requireCsrf) {
        const csrfToken = getCookie('csrftoken');
        if (!csrfToken) {
            throw new Error('CSRF token not found!');
        }
        headers['X-CSRFToken'] = csrfToken;
    }

    const token = localStorage.getItem('authToken');
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
};