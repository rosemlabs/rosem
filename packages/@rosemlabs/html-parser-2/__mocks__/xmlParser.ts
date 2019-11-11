// import TemplateCompiler from '@rosemlabs/template-compiler/TemplateCompiler'
// import { VDOMRenderer } from '@rosemlabs/virtual-dom'
// import {
//   VirtualCDATASection,
//   VirtualComment,
//   VirtualDocumentFragment,
//   VirtualElement,
//   VirtualNode,
//   VirtualParentNode,
//   VirtualText,
// } from '@rosemlabs/virtual-dom'
// import XMLParser from '../XMLParser'
//
// export default new (class {
//   private readonly parser: XMLParser
//   private readonly compiler: TemplateCompiler<
//     VirtualNode,
//     VirtualParentNode,
//     VirtualDocumentFragment,
//     VirtualElement,
//     VirtualText,
//     VirtualComment,
//     VirtualCDATASection
//   >
//
//   constructor() {
//     this.parser = new XMLParser()
//     this.compiler = new TemplateCompiler(new VDOMRenderer())
//     this.parser.addModule(this.compiler)
//   }
//
//   parseFromString(source: string): VirtualDocumentFragment {
//     this.parser.parseFromString(source)
//
//     return this.compiler.getCompiledResult()
//   }
// })()
