// api/orders.js
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 데이터 생성
    const { ordername, orderwork, ordertime, ordermenu, orderoption, ordercount } = req.body;

    // 필수 데이터 유효성 검사
    if (!ordername || !orderwork || !ordertime || !ordermenu || !ordercount) {
      return res.status(400).json({ error: '필수 데이터가 누락되었습니다.' });
    }

    // Supabase에 데이터 삽입
    const { data, error } = await supabase.from('orders').insert([
      { ordername, orderwork, ordertime, ordermenu, orderoption, ordercount },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: '주문이 성공적으로 저장되었습니다.', data });
  } else if (req.method === 'GET') {
    // 데이터 조회
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } else if (req.method === 'DELETE') {
    // 데이터 삭제 (id를 기반으로)
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'id가 필요합니다.' });
    }

    const { error } = await supabase.from('orders').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: '주문이 성공적으로 삭제되었습니다.' });
  } else {
    return res.status(405).json({ error: '허용되지 않는 메서드입니다.' });
  }
}
