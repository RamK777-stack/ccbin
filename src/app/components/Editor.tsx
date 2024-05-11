'use client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CodeBox from '@bomdi/codebox';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AttachesTool from '@editorjs/attaches';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CheckList from '@editorjs/checklist';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CodeTool from '@editorjs/code';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
import EditorJS, { OutputData } from '@editorjs/editorjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkTool from '@editorjs/link';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Marker from '@editorjs/marker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NestedList from '@editorjs/nested-list';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Quote from '@editorjs/quote';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RawHTML from '@editorjs/raw';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SimpleImage from '@editorjs/simple-image';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Table from '@editorjs/table';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TextVariantTune from '@editorjs/text-variant-tune';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Underline from '@editorjs/underline';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Warning from '@editorjs/warning';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'Type something...',
        level: 2,
      },
    },
  ],
};

interface PropTypes {
  setOutputData?: Dispatch<SetStateAction<OutputData | null>>;
}

interface EditorJSInstance {
  isReady: Promise<void>;
  saver: {
    save: () => Promise<OutputData>;
  };
  destroy: () => void;
  // Add other methods/properties you plan to use
}

export default function Editor({ setOutputData }: PropTypes) {
  const ejInstance = useRef<EditorJSInstance | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const content = await editor.saver.save();
        setOutputData?.(content);
      },
      tools: {
        header: Header,
        list: { class: NestedList, inlineToolbar: true },
        checklist: {
          class: CheckList,
          inlineToolbar: true,
        },
        // FIXME: some fix need
        linkTool: {
          class: LinkTool,
        },
        rawHtml: RawHTML,
        image: {
          class: SimpleImage,
          inlineToolbar: true,
          config: {
            placeholder: 'Paste image URL',
          },
        },
        embed: {
          class: Embed,
          config: {
            service: {
              youtube: true,
              facebook: true,
              instagram: true,
              twitter: true,
              codepen: true,
              pinterest: true,
            },
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        textVariant: TextVariantTune,
        underline: Underline,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        code: CodeTool,
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
          },
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        attaches: {
          class: AttachesTool,
          config: {
            // FIXME: fix the path
            endpoint: 'http://localhost:8008/uploadFile',
          },
        },
        delimiter: Delimiter,
        codeBox: {
          class: CodeBox,
          config: {
            themeURL:
              'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
            themeName: 'atom-one-dark',
            useDefaultTheme: 'dark',
          },
        },
      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col mt-10'>
      <div className='w-[50rem] self-center shadow-[0_-3px_29px_-5px_rgba(34,39,47,.14)] rounded-lg px-10 py-10 min-h-[40rem]'>
        <div id='editorjs'></div>
      </div>
    </div>
  );
}
