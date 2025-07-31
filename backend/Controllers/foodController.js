import { itemmodle } from '../Models/itemSchema.js'

const itemlist = async (req, res)=>{
 try {
    const itemslist = await itemmodle.find()
    res.json(itemslist)
  }
  catch {
    res.json("some error")
  }
}

const item = async (req, res)=>{
 try {
    const item = await itemmodle.findOne({ id: req.params.id })
    res.json(item)
  }
  catch(error) {
    console.log(error)
    res.json("some error")
  }
}

export {item, itemlist}