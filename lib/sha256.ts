import {Sha256} from 'https://deno.land/std@0.93.0/hash/sha256.ts';

export function Sha256ToInt(s: string) {
    const sha256 = new Sha256()
    sha256.update(s);
    return parseInt(sha256.hex().substring(0, 8), 16)
}