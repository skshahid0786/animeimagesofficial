import fetch from 'node-fetch';

// Utility to fetch JSON safely
async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("Fetch failed:", e);
    return null;
  }
}

// All commands
const commands = [
  { name: 'Simple hello', keywords:['hi','hello'], action:()=> 'Hi there! 👋' },
  { name: 'Alternate greetings', keywords:['hiya','yo','sup'], action:()=> 'Hey! 👋' },
  { name: 'Good morning', keywords:['good morning','morning'], action:()=> 'Good morning! Have a great day 😊' },
  { name: 'Good night', keywords:['good night','night'], action:()=> 'Good night! Sleep well 🌙' },
  { name: 'I love you', keywords:['i love you','love you'], action:()=> 'I appreciate you! ❤️' },
  { name: 'Thank you', keywords:['thank you','thanks'], action:()=> 'You’re welcome! 🙌' },
  { name: 'Apology', keywords:['sorry','i am sorry'], action:()=> 'It’s okay. Let’s move on.' },

  // Notes
  { name:'Save note', keywords:['note','remember','save note'], action:(t)=> { 
      const note = t.match(/(?:note|remember|save note) (.+)$/i)?.[1]; 
      if(!note) return 'Say: note buy milk'; 
      const list = JSON.parse(global.notes||'[]'); 
      list.push({text:note,ts:Date.now()}); 
      global.notes = JSON.stringify(list); 
      return 'Saved note.'; 
  }},
  { name:'Show notes', keywords:['show notes','list notes','my notes'], action:()=> { 
      const list = JSON.parse(global.notes||'[]'); 
      return list.length ? list.map((n,i)=>`${i+1}. ${n.text}`).join('\n') : 'No notes saved.'; 
  }},
  { name:'Clear notes', keywords:['clear notes','delete notes','remove notes'], action:()=> { 
      global.notes = JSON.stringify([]); 
      return 'Notes cleared.'; 
  }},

  // Conversions
  { name:'Binary convert', keywords:['to binary','binary of'], action:(t)=> { 
      const n = parseInt(t.match(/\d+/)?.[0]); 
      return isNaN(n)? 'Say: to binary 12' : n.toString(2); 
  }},
  { name:'Hex convert', keywords:['to hex','hex of'], action:(t)=> { 
      const n = parseInt(t.match(/\d+/)?.[0]); 
      return isNaN(n)? 'Say: to hex 255' : n.toString(16); 
  }},
  { name:'Unix timestamp', keywords:['timestamp','unix time','epoch'], action:()=> Math.floor(Date.now()/1000).toString() },
  { name:'Reverse words', keywords:['reverse words','reverse sentence'], action:(t)=> { 
      const m = t.match(/(?:reverse words|reverse sentence) (.+)$/i)?.[1]; 
      return m ? m.split(' ').reverse().join(' ') : 'Usage: reverse words hello world'; 
  }},
  { name:'URL encode', keywords:['url encode','encode url'], action:(t)=> { 
      const u = t.match(/url encode (.+)$/i)?.[1]; 
      return u? encodeURIComponent(u) : 'Usage: url encode https://example.com'; 
  }},
  { name:'URL decode', keywords:['url decode','decode url'], action:(t)=> { 
      const u = t.match(/url decode (.+)$/i)?.[1]; 
      return u? decodeURIComponent(u) : 'Usage: url decode ...'; 
  }},
  { name:'Capitalize words', keywords:['capitalize','title case'], action:(t)=> { 
      const m = t.match(/(?:capitalize|title case) (.+)$/i)?.[1]; 
      return m? m.split(' ').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ') : 'Usage: capitalize hello world'; 
  }},
  { name:'Make acronym', keywords:['acronym','initials'], action:(t)=> { 
      const m = t.match(/(?:acronym|initials) (.+)$/i)?.[1]; 
      return m? m.split(' ').map(s=>s[0]?.toUpperCase()).join('') : 'Usage: acronym national aeronautics space administration'; 
  }},

  // Fun / random
  { name:'Random emoji', keywords:['emoji','send emoji'], action:()=> ['😀','🎉','🔥','😎','🤖'][Math.floor(Math.random()*5)] },
  { name:'Fun fact', keywords:['did you know','fun fact'], action:()=> ['Octopus hearts: 3','A day on Venus is longer than a year','Honeybees can recognize faces'][Math.floor(Math.random()*3)] },
  { name:'ASCII art', keywords:['ascii','ascii art'], action:()=> '¯\\_(ツ)_/¯' },
  { name:'Shuffle list', keywords:['shuffle','randomize list'], action:(t)=> { 
      const m = t.match(/(?:shuffle|randomize) (.+)$/i)?.[1]; 
      return m? m.split(',').sort(()=>Math.random()-0.5).join(',') : 'Usage: shuffle a,b,c'; 
  }},

  // Tips
  { name:'Motivation tip', keywords:['motivation tip','productivity tip','motivate me'], action:()=> 'Break big tasks into 25-minute sprints (Pomodoro).' },
  { name:'Health tip', keywords:['health tip','wellness tip'], action:()=> 'Drink water regularly and take short walks.' },
  { name:'Study tip', keywords:['study tip','exam tip'], action:()=> 'Teach the topic to an imaginary student — it improves retention.' },

  // Time / Date
  { name:'Time', keywords:['time'], action:()=> new Date().toLocaleTimeString() },
  { name:'Date', keywords:['date'], action:()=> new Date().toLocaleDateString() },

  // API / External
  { name:'Random joke', keywords:['joke'], action: async ()=> { 
      const r = await fetchJson('https://official-joke-api.appspot.com/random_joke'); 
      return r? `${r.setup} ${r.punchline}` : 'Could not fetch joke'; 
  }},
  { name:'Random advice', keywords:['advice'], action: async ()=> { 
      const r = await fetchJson('https://api.adviceslip.com/advice'); 
      return r?.slip?.advice || 'Could not fetch advice'; 
  }},
  { name:'Random quote', keywords:['quote'], action: async ()=> { 
      const r = await fetchJson('https://api.quotable.io/random'); 
      return r? `"${r.content}" — ${r.author}` : 'Could not fetch quote'; 
  }},

  // Images
  { name:'Waifu', keywords:['waifu'], action: async ()=> { const r=await fetchJson('https://api.waifu.pics/sfw/waifu'); return r?.url || 'Could not fetch waifu'; } },
  { name:'Neko', keywords:['neko'], action: async ()=> { const r=await fetchJson('https://api.waifu.pics/sfw/neko'); return r?.url || 'Could not fetch neko'; } },
  { name:'Cuddle', keywords:['cuddle'], action: async ()=> { const r=await fetchJson('https://api.waifu.pics/sfw/cuddle'); return r?.url || 'Could not fetch cuddle'; } },
  { name:'Kiss', keywords:['kiss'], action: async ()=> { const r=await fetchJson('https://api.waifu.pics/sfw/kiss'); return r?.url || 'Could not fetch kiss'; } },

  // Wikipedia search
  { name:'Search Wikipedia', keywords:['search'], action: async (t)=> { 
      const term = t.replace(/search /i,'').trim(); 
      if(!term) return 'Provide a search term'; 
      const r = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`); 
      return r?.extract || 'No info found'; 
  }}
];

// Handler
export default async function handler(req, res) {
  const query = (req.query.q || '').toLowerCase().trim();

  for (const cmd of commands) {
    if (cmd.keywords.some(k => query.startsWith(k))) {
      try {
        const result = await cmd.action(query);
        return res.json({ success:true, result });
      } catch (e) {
        console.error("Command failed:", e);
        return res.status(500).json({ success:false, error:'Command execution failed' });
      }
    }
  }

  return res.json({ success:true, result: "Try: joke, time, date, advice, quote, search <term>, waifu, neko, cuddle, kiss, hi, hello..." });
}
