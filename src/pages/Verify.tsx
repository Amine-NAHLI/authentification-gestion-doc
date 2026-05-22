import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ShieldCheck, AlertOctagon } from 'lucide-react';

interface DocumentData {
  document_type: string;
  issue_date: string;
  student_name?: string;
  cne?: string;
  filiere?: string;
  groupe?: string;
  moyenne?: string;
  professor_name?: string;
  specialite?: string;
  grade?: string;
}

interface VerifyResponse {
  status: 'valid' | 'invalid';
  data?: DocumentData;
  message?: string;
}

export default function Verify() {
  const { documentId } = useParams<{ documentId: string }>();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerifyResponse | null>(null);

  useEffect(() => {
    const verifyDocument = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await axios.get<VerifyResponse>(`${apiUrl}/api/verify/${documentId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setResult(response.data);
      } catch (error: any) {
        if (error.response && error.response.data) {
          setResult(error.response.data);
        } else {
          setResult({
            status: 'invalid',
            message: 'Erreur de connexion au serveur ou signature invalide.'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      verifyDocument();
    }
  }, [documentId]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-lg">
        {loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl text-center"
          >
            <Loader2 className="w-16 h-16 text-indigo-400 animate-spin mb-6" />
            <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Déchiffrement de la signature cryptographique...
            </h2>
            <p className="text-slate-400 mt-3 text-sm">
              Veuillez patienter pendant que nous vérifions l'authenticité de ce document.
            </p>
          </motion.div>
        ) : result?.status === 'valid' && result.data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="bg-emerald-950/40 backdrop-blur-xl border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20"
          >
            <div className="p-8 pb-6 text-center border-b border-emerald-500/20 bg-emerald-900/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-6"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400" />
              </motion.div>
              <h1 className="text-2xl font-bold text-emerald-50 mb-2">Document Authentique</h1>
              <p className="text-emerald-200/70 text-sm">La signature cryptographique correspond aux archives officielles.</p>
            </div>
            
            <div className="p-8 space-y-5">
              <div className="space-y-4">
                {result.data.student_name && (
                  <>
                    <div>
                      <p className="text-xs text-emerald-300/60 uppercase tracking-wider font-semibold mb-1">Étudiant(e)</p>
                      <p className="text-lg font-medium text-emerald-50">{result.data.student_name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-emerald-300/60 uppercase tracking-wider font-semibold mb-1">CNE</p>
                        <p className="text-emerald-100">{result.data.cne}</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-300/60 uppercase tracking-wider font-semibold mb-1">Date d'édition</p>
                        <p className="text-emerald-100">{result.data.issue_date}</p>
                      </div>
                    </div>
                  </>
                )}
                {result.data.professor_name && (
                  <>
                    <div>
                      <p className="text-xs text-emerald-300/60 uppercase tracking-wider font-semibold mb-1">Professeur(e)</p>
                      <p className="text-lg font-medium text-emerald-50">{result.data.professor_name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-emerald-300/60 uppercase tracking-wider font-semibold mb-1">Grade</p>
                        <p className="text-emerald-100">{result.data.grade}</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-300/60 uppercase tracking-wider font-semibold mb-1">Date d'édition</p>
                        <p className="text-emerald-100">{result.data.issue_date}</p>
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-xs text-emerald-300/60 uppercase tracking-wider font-semibold mb-1">Type de Document</p>
                  <p className="text-emerald-100">{result.data.document_type}</p>
                </div>
                {result.data.specialite && (
                  <div className="bg-emerald-900/40 rounded-xl p-4 border border-emerald-500/20 flex justify-between items-center mt-2">
                    <span className="text-emerald-200/80 font-medium">Spécialité</span>
                    <span className="text-lg font-bold text-emerald-300">{result.data.specialite}</span>
                  </div>
                )}
                {result.data.student_name && (
                  <div className="bg-emerald-900/40 rounded-xl p-4 border border-emerald-500/20 flex justify-between items-center mt-2">
                    <span className="text-emerald-200/80 font-medium">Moyenne validée</span>
                    <span className="text-xl font-bold text-emerald-300">{result.data.moyenne}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-emerald-950/80 p-4 border-t border-emerald-500/20 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wide">
                🔒 Certifié par Clé Publique PKI de l'UPF
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="bg-red-950/40 backdrop-blur-xl border border-red-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20"
          >
            <div className="p-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.1, bounce: 0.5 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/20 mb-6"
              >
                <AlertOctagon className="w-12 h-12 text-red-400" />
              </motion.div>
              <h1 className="text-3xl font-bold text-red-50 mb-4">Document Invalide</h1>
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 text-red-200">
                <p className="text-base font-medium">{result?.message || "Signature cryptographique invalide ou document altéré."}</p>
              </div>
              <p className="mt-6 text-sm text-red-300/60">
                Ce document n'a pas pu être vérifié avec succès. Il s'agit potentiellement d'un faux.
              </p>
            </div>
            <div className="bg-red-950/80 p-4 border-t border-red-500/20 flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-xs font-semibold text-red-400 tracking-wide">
                Échec de la vérification cryptographique
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
