const SUPABASE_URL = "https://wqwrcjiiqkhfixupcjjh.supabase.co";
const SUPABASE_KEY = "sb_publishable_tKFxLlf5jAAfL1nBNsvO9Q_0WWpk_HC";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let vooEditandoId = null;

// SALVAR / EDITAR
async function salvarVoo(dados) {
  if (vooEditandoId) {
    const { error } = await supabaseClient
      .from("flights")
      .update(dados)
      .eq("id", vooEditandoId);

    if (error) {
      console.log(error);
      alert("Erro ao atualizar");
    } else {
      alert("Atualizado ✈️");
      vooEditandoId = null;
    }
  } else {
    const { error } = await supabaseClient
      .from("flights")
      .insert([dados]);

    if (error) {
      console.log(error);
      alert("Erro ao salvar");
    } else {
      alert("Salvo ✈️");
    }
  }
}

// EDITAR
async function editarVoo(id) {
  const { data, error } = await supabaseClient
    .from("flights")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    alert("Erro ao carregar voo");
    return;
  }

  localStorage.setItem("vooEditando", JSON.stringify(data));
  window.location.href = "registrar.html";
}

// EXCLUIR
async function excluirVoo(id) {
  const { error } = await supabaseClient
    .from("flights")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Erro ao excluir");
  } else {
    alert("Excluído");
    location.reload();
  }
}