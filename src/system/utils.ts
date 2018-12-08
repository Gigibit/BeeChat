export class Utils{
    public static getRandomItem(items: any[]): any{
        return items[Math.floor(Math.random()*items.length)];
    }
    public static getFirstItemFiltered(items: any[], filter: (item)=> boolean){
        if (items.length) return null;
        let filteredItems = items.filter(filter)
        return  filteredItems.length > 0 ? filteredItems[0] : null;
    }
    public static getRandomItemFiltered(items: any[], filter: (item)=> boolean){
        return Utils.getRandomItem(items.filter(filter))
    }
    public static bake_cookie(name, value) {
        var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
        document.cookie = cookie;
      }      
    public static read_cookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
       }
    public static delete_cookie(name) {
        document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
      }     
      
}