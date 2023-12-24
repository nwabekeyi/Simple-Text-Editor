// Mentions.js
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import editorStyles from './editorStyles.css';

export default function Mentions({ plugins }) {
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [open, setOpen] = useState(false);

  const mentionSuggestions = [
    {
      name: 'Matthew Russell',
      link: 'https://twitter.com/mrussell247',
      avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
      name: 'Julian Krispel-Samsel',
      link: 'https://twitter.com/juliandoesstuff',
      avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    },
    {
      name: 'Jyoti Puri',
      link: 'https://twitter.com/jyopur',
      avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    },
    {
      name: 'Max Stoiber',
      link: 'https://twitter.com/mxstbr',
      avatar: 'https://avatars0.githubusercontent.com/u/7525670?s=200&v=4',
    },
    {
      name: 'Nik Graf',
      link: 'https://twitter.com/nikgraf',
      avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    },
    {
      name: 'Pascal Brandt',
      link: 'https://twitter.com/psbrandt',
      avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
  ];

  const [suggestions, setSuggestions] = useState(mentionSuggestions);

  const { MentionSuggestions, plugins: mentionPlugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({ mentionPrefix: '@' });
    const { MentionSuggestions } = mentionPlugin;
    const mentionPlugins = [mentionPlugin];
    return { MentionSuggestions, plugins: mentionPlugins };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentionSuggestions));
  }, []);

  return (
    <div
      className={editorStyles.editor}
      onClick={() => {
        ref.current.focus();
      }}
    >
      <Editor
        editorKey={'editor'}
        editorState={editorState}
        onChange={setEditorState}
        plugins={[...plugins, ...mentionPlugins]}
        ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
    </div>
  );
}
