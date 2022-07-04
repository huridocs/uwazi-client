type ServiceResponse = {
    ok: boolean,
    data: unknown,
    error?: {
        code: string,
    }
}

const login =async (username: string, password:string ): Promise<ServiceResponse> =>Promise.resolve({ok:true, data: {username, password}});

export type{ServiceResponse}
export {login}
