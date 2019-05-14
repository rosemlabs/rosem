import { forEach } from 'lodash-es'
import Hydrator from '@rosem/virtual-dom/Hydrator'
import Renderer from '@rosem/virtual-dom/Renderer'
import VirtualInstance, {
  VirtualNode,
  VirtualNodeAttrDescriptor,
  VirtualNodeType,
} from './VirtualInstance'

export default class VirtualHydrator<OutputNode>
  implements Hydrator<VirtualNode, OutputNode> {
  public hydrate<
    VirtualElementProps extends object,
    ParentNode extends OutputNode,
    DocumentFragment extends ParentNode,
    Element extends ParentNode,
    Text extends OutputNode,
    Comment extends OutputNode = OutputNode,
    CDATASection extends OutputNode = OutputNode
  >(
    inputNode: VirtualInstance<VirtualElementProps>,
    renderer: Renderer<
      OutputNode,
      ParentNode,
      DocumentFragment,
      Element,
      Text,
      Comment,
      CDATASection
    >
  ): OutputNode {
    switch (inputNode.type) {
      case VirtualNodeType.DOCUMENT_FRAGMENT_NODE: {
        const documentFragment: DocumentFragment = renderer.createDocumentFragment()

        this.appendVirtualNodeList(
          documentFragment,
          inputNode.children as VirtualInstance<VirtualElementProps>[],
          renderer
        )

        return documentFragment
      }
      case VirtualNodeType.ELEMENT_NODE: {
        const element: Element = inputNode.namespaceURI
          ? renderer.createElementNS(
              inputNode.namespaceURI,
              inputNode.tagName
            )
          : renderer.createElement(inputNode.tagName)

        if (inputNode.attrs) {
          forEach(inputNode.attrs, function(
            attr: VirtualNodeAttrDescriptor,
            key: string
          ) {
            attr.namespaceURI
              ? renderer.setAttributeNS(
                  element,
                  (attr as VirtualNodeAttrDescriptor).namespaceURI,
                  key,
                  (attr as VirtualNodeAttrDescriptor).value
                )
              : renderer.setAttribute(element, key, attr.value)
          })
        }

        this.appendVirtualNodeList(
          element,
          inputNode.children as VirtualInstance<VirtualElementProps>[],
          renderer
        )

        return element
      }
      case VirtualNodeType.TEXT_NODE:
        return renderer.createText(String(inputNode.text))
      case VirtualNodeType.COMMENT_NODE:
        return renderer.createComment(String(inputNode.text))
      case VirtualNodeType.CDATA_SECTION_NODE:
        return renderer.createCDATASection(String(inputNode.text))
    }
  }

  protected appendVirtualNodeList<
    VirtualElementProps extends object,
    ParentNode extends OutputNode,
    DocumentFragment extends ParentNode,
    Element extends ParentNode,
    Text extends OutputNode,
    Comment extends OutputNode = OutputNode,
    CDATASection extends OutputNode = OutputNode
  >(
    parent: DocumentFragment | Element,
    nodeList: VirtualInstance<VirtualElementProps>[],
    renderer: Renderer<
      OutputNode,
      ParentNode,
      DocumentFragment,
      Element,
      Text,
      Comment,
      CDATASection
    >
  ): void {
    if (nodeList) {
      for (const child of nodeList) {
        if (null != child) {
          renderer.appendChild(parent, this.hydrate(child, renderer))
        }
      }
    }
  }
}