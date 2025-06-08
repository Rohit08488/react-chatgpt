export function checkhading(str){
    return /^(\*)(\*)(.*)\*$/.test(str)
}
export function replacehadingstars(str){
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
}