import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

export type ChainableProxy = (
  request: NextRequest,
  event: NextFetchEvent
) => Promise<NextResponse>

export type ProxyFactory = (proxy: ChainableProxy) => ChainableProxy

export function chainProxy(
  functions: ProxyFactory[] = [],
  index = 0
): ChainableProxy {
  const current = functions[index]

  if (current) {
    const next = chainProxy(functions, index + 1);

    return current(next)
  }

  return async (request) => NextResponse.next({ request })
}
