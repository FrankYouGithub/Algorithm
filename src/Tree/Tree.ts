import { Queue } from '../Queue'
import { Stack } from '../Stack'

export class Node {
  public data: any
  public children: Node[] = []
  public parent: Node

  constructor (data: any, parent: Node = null) {
    this.data = this.data
    this.parent = parent
  }

  public appendChild (data: any): Node {
    const node = new Node(this, data)
    this.children.push(node)
    return node
  }

  public appendNode (node: Node) {
    node.parent = this
    this.children.push(node)
  }

  public removeNode (node: Node) {
    const index = this.children.indexOf(node)
    if (index !== -1) {
      this.children.splice(index, 1)
    }
  }

  public DFSWalk (callBack: Function) {
    const stack = new Stack<any>()
    let current: Node = this
    stack.push(current)
    while (stack.sizeOf() !== 0) {
      current = stack.pop()
      callBack(current)
      for (let item of current.children) {
        stack.push(item)
      }
    }
  }

  public BFSWalk (callBack: Function) {
    const queue = new Queue<any>()
    let current: Node = this
    queue.enQueue(current)
    while (queue.sizeOf() !== 0) {
      current = queue.deQueue()
      callBack(current)
      for (let node of current.children) {
        queue.enQueue(node)
      }
    }
  }

  public colorDFSWalk (callBack: Function) {
    const stack = new Stack<any>()
    let current: Node = this
    const color = []

    while (current || stack.sizeOf() > 0) {
      if (current) {
        if (color[current.data] !== 'black') {
          stack.push(current)
        }

        current = current.children.find(n => n && color[n.data] !== 'black') 

      } else {
        current = stack.pop()
        color[current.data] = 'black'
      }
    }
  }
}

export class Tree {
  public preOrder (node) {
    const stack = []
    let current
    stack.push(node)
    while (stack.length > 0) {
      current = stack.pop()
      console.log(current.val)
      if (current.right) {
        stack.push(current.right)
      }
      if (current.legt) {
        stack.push(current.left)
      }
    }
  }

  public inOrder (node) {
    const stack = []
    let current = node
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      if (stack.length > 0) {
        current = stack.pop()
        console.log(current.val)
        current = current.right
      }
    }
  }

  public postOrder (node) {
    const stack = []
    let current = node
    let prev = null
    while (current || stack.length > 0) {
      if (current) {
        stack.push(current)
      } else {
        current = stack[stack.length - 1]
        if (current.right && current.right !== prev) {
          current = current.right
        } else {
          current = stack.pop()
          console.log(current.val)
          prev = current
          current = null
        }
      }
    }
  }

  public postOrder2 (node) {
    const stack = []
    const arr = []
    let current = null
    stack.push(node)
    while (stack.length > 0) {
      current = stack.pop()
      arr.push(current.val)
      if (current.left) {
        stack.push(current.left)
      }
      if (current.right) {
        stack.push(current.right)
      }
    }

    return arr.reverse()
  }
}

