
export class ToogleState{
    state: number
    statesFunction:(()=>void)[]
    constructor(statesFunction:(()=>void)[], state=0){
        this.statesFunction = statesFunction
        this.state = state

    }
    toogle(){
        if (this.state >= this.statesFunction.length) this.state = 0
        this.statesFunction[this.state++]()
    }
}